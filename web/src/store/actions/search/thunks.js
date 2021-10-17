// Axios
import axios from 'axios';

// Lodash
import _ from 'lodash';

// QueryString
import qs from 'qs';

// Redux
import { batch } from 'react-redux';

// Constants
import { SEARCH_FILTER_ANY } from '../../../constants/search';

// Creators
import * as creators from './creators';
import { showAlert } from '../';

export const getWebResults = (query, filter, isPaged = false) => {
  return (dispatch, getState) => {
    dispatch(creators.getResultsStart({ query, isPaged, source: 'web' }));

    let queryParams = {
      query,
      filter: _.pickBy(filter, (value, _) => {
        return value !== SEARCH_FILTER_ANY.type;
      }),
    };

    if (isPaged) {
      const { page, limit } = getState().search.data.pagination.next;
      queryParams = {
        ...queryParams,
        page,
        limit,
      };
    }

    const searchUrl = `/search/web?${qs.stringify(queryParams)}`;

    axios
      .get(searchUrl)
      .then((response) => {
        dispatch(creators.getResultsSuccess(response.data));
      })
      .catch((error) => {
        batch(() => {
          dispatch(creators.getResultsFailure(error));
          dispatch(showAlert());
        });
      });
  };
};
