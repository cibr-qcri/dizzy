const es = require('../services/es');
const Statistic = require('../models/Statistic');

const computeStats = async () => {
  console.log(`[cron:computeStats] Server running a scheduled job`.magenta);

  const count = {};
  try {
    count.page = await getPageCount();
    count.domain = await getDomainCount();
    count.crypto = await getCryptoCount();
    await Statistic.create({
      type: 'batch',
      computed: {
        count,
      },
    });
  } catch (error) {
    console.log(`[cron:computeStats] Error while computing stats`.red);
    console.log(error);
  }
};

const getPageCount = async () => {
  let result = await es.search({
    index: [process.env.ES_CRAWLER_INDEX, process.env.ES_RECRAWLER_INDEX],
    size: 0,
    body: {
      aggs: {
        pageCount: {
          cardinality: {
            field: 'data.info.url',
          },
        },
      },
    },
  });
  return result.body.aggregations.pageCount.value;
};

const getDomainCount = async () => {
  result = await es.search({
    index: process.env.ES_CRAWLER_INDEX,
    size: 0,
    body: {
      aggs: {
        domainCount: {
          cardinality: {
            field: 'data.info.domain',
          },
        },
      },
    },
  });
  return result.body.aggregations.domainCount.value;
};

const getCryptoCount = async () => {
  result = await es.search({
    index: [process.env.ES_CRAWLER_INDEX, process.env.ES_RECRAWLER_INDEX],
    size: 0,
    body: {
      aggs: {
        btcAddressCount: {
          cardinality: {
            field: 'data.info.cryptocurrency.btc.address.keyword',
          },
        },
      },
    },
  });
  return {
    btc: result.body.aggregations.btcAddressCount.value,
  };
};

module.exports = computeStats;
