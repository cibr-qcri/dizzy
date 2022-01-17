const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const es = require('../services/es');
const moment = require('moment');
const Search = require('../models/Search');
const Statistic = require('../models/Statistic');

const MAX_RESULTS_IN_PAGE = 25;
const MAX_MIRROR_GROUP_COUNT = 20000;
const DEFAULT_PAGE_NUM = 1;
const QUERY_EDIT_DISTANCE_FRACTION = 3;
const NO_BITCOIN_FILTER = 'none';

const CATEGORIES = {
  'crypto-service': 'Cryptocurrency service',
  index: 'Index, link list, or similar',
  marketplace: 'Marketplace',
  pornography: 'Pornography',
  forum: 'Forum',
  other: 'Other',
};

const FILTERS = {
  CATEGORY: [
    'crypto-service',
    'index',
    'marketplace',
    'pornography',
    'forum',
    'other',
  ],
  CRYPTOCURRENCY: ['btc', 'none'],
  SAFETY: ['illicit', 'not-illicit'],
  PRIVACY: ['tracking', 'no-tracking'],
  MIRRORING: ['mirrored', 'not-mirrored'],
  LANGUAGE: ['ar', 'en', 'fr', 'de', 'ru', 'es'],
};

const FILTER_TYPES = {
  CATEGORY: 'category',
  CRYPTOCURRENCY: 'cryptos',
  SAFETY: 'safety',
  PRIVACY: 'privacy',
  MIRRORING: 'mirroring',
  LANGUAGE: 'language',
};

const CRYPTOCURRENCY = {
  btc: 'Bitcoin',
  eth: 'Ethereum',
};

const webResults = asyncHandler(async (request, response, next) => {
  const { query, filter } = request.query;

  if (!query) {
    return next(new ErrorResponse('Please provide a search query', 400));
  }

  Search.create({
    user: request.user.id,
    query,
    filter,
    source: 'web',
  });

  let filters = [];
  for (let key in filter) {
    if (
      key === FILTER_TYPES.CATEGORY &&
      FILTERS.CATEGORY.includes(filter[key])
    ) {
      filters.push(`(data.info.domain_info.category.type: ${filter[key]})`);
    } else if (
      key === FILTER_TYPES.CRYPTOCURRENCY &&
      FILTERS.CRYPTOCURRENCY.includes(filter[key])
    ) {
      if (filter[key] === NO_BITCOIN_FILTER) {
        filters.push('NOT (_exists_: data.info.domain_info.attribution)');
      } else {
        filters.push(
          `(_exists_: data.info.domain_info.attribution.${filter[key]})`
        );
      }
    } else if (
      key === FILTER_TYPES.SAFETY &&
      FILTERS.SAFETY.includes(filter[key])
    ) {
      filters.push(
        `(data.info.domain_info.safety.is_safe: ${
          filter[key] === 'not-illicit'
        })`
      );
    } else if (
      key === FILTER_TYPES.PRIVACY &&
      FILTERS.PRIVACY.includes(filter[key])
    ) {
      filters.push(
        `(data.info.domain_info.privacy.js.fingerprinting.is_fingerprinted: ${
          filter[key] === 'tracking'
        })`
      );
    } else if (
      key === FILTER_TYPES.MIRRORING &&
      FILTERS.MIRRORING.includes(filter[key])
    ) {
      filters.push(
        `(data.info.domain_info.mirror.is_mirrored: ${
          filter[key] === 'mirrored'
        })`
      );
    } else if (
      key === FILTER_TYPES.LANGUAGE &&
      FILTERS.LANGUAGE.includes(filter[key])
    ) {
      filters.push(`(data.info.domain_info.language: ${filter[key]})`);
    }
  }
  let filterQuery = filters.length > 0 ? 'AND ' + filters.join(' AND ') : '';

  const page = parseInt(request.query.page, 10) || DEFAULT_PAGE_NUM;
  const limit = parseInt(request.query.limit, 10) || MAX_RESULTS_IN_PAGE;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const queryEditDistance =
    parseInt(query.length) / QUERY_EDIT_DISTANCE_FRACTION;

  const esQuery = `_exists_:data.info.domain_info.language AND (${query} ${filterQuery})`;

  const domainStatistic = await Statistic.findOne({ type: 'domain' });
  const results = await es.search({
    index: process.env.ES_CRAWLER_INDEX,
    from: startIndex,
    size: limit,
    body: {
      query: {
        query_string: {
          query: esQuery,
        },
      },
      aggs: {
        mirrorSize: {
          terms: {
            field: 'data.info.domain_info.mirror.group',
            size: MAX_MIRROR_GROUP_COUNT,
          },
          aggs: { domains: { cardinality: { field: 'data.info.domain' } } },
        },
      },
      _source: [
        'data.info.title',
        'data.info.url',
        'data.info.domain_info',
        'data.info.summary',
        'data.timestamp',
      ],
    },
  });

  const total = results.body.hits.total.value;

  let mirrorMap = {};
  const buckets = results.body.aggregations.mirrorSize.buckets;
  for (const obj of buckets) {
    mirrorMap[obj.key] = obj.domains.value;
  }

  const hits = results.body.hits.hits.map((hit) => {
    const domainInfo = hit._source.data.info.domain_info;
    const safety = domainInfo.safety.is_safe ? 'Not illicit' : 'Illicit';
    const cryptos = domainInfo.attribution
      ? domainInfo.attribution
      : { btc: [] };
    let cryptoLabels = '';
    for (let key in cryptos) {
      cryptoLabels += `${cryptos[key].length} (${CRYPTOCURRENCY[key]})`;
    }

    const languageNames = new Intl.DisplayNames(['en'], { type: 'language' });
    const mirrors = mirrorMap[domainInfo.mirror.group];

    let status = 'N/A';
    let availability = 'N/A';
    if (domainStatistic) {
      const domains = domainStatistic.computed.domains;
      const domain = hit._source.data.info.domain_info.name.split('.')[0];
      if (domain in domains) {
        const hourDiff = moment().diff(
          moment(domains[domain].timestamp),
          'hours'
        );
        const onlineStr = domains[domain].is_online ? 'Online' : 'Offline';
        if (hourDiff === 0) {
          status = `${onlineStr} (a few minutes ago)`;
        } else {
          const hourStr = hourDiff === 1 ? 'hour' : 'hours';
          status = `${onlineStr} (${hourDiff} ${hourStr} ago)`;
        }
        availability = `${domains[domain].availability}% (last 7 days)`;
      }
    }

    return {
      id: hit._id,
      url: hit._source.data.info.url,
      title: hit._source.data.info.title,
      crawledAt: moment(hit._source.data.timestamp).utc().toISOString(true),
      body: hit._source.data.info.summary || hit._source.data.info.title,
      info: [
        {
          title: 'Category',
          text: CATEGORIES[domainInfo.category.type],
        },
        {
          title: 'Crypto Addresses',
          text: cryptoLabels,
        },
        {
          title: 'Safety',
          text: safety,
        },
        {
          title: 'Privacy',
          text: domainInfo.privacy.js.fingerprinting.is_fingerprinted
            ? 'Tracked'
            : 'Not tracked',
        },
        {
          title: 'Mirroring',
          text: domainInfo.mirror.is_mirrored
            ? `Yes (${mirrors} other ${mirrors > 1 ? 'domains' : 'domain'})`
            : 'No (Unique)',
        },
        {
          title: 'Main Language',
          text: languageNames.of(domainInfo.language),
        },
        {
          title: 'Status',
          text: status,
        },
        {
          title: 'Availability',
          text: availability,
        },
      ],
    };
  });

  const pagination = {};
  if (hits.length > 0) {
    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit,
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit,
      };
    }
  }

  response.webResults = {
    success: true,
    count: hits.length,
    pagination,
    data: hits,
  };

  next();
});

module.exports = webResults;
