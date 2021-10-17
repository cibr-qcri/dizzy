// Axios
import axios from 'axios';

// Lodash
import _ from 'lodash';

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

    let searchUrl = '/search/web?query=' + query;
    if (isPaged) {
      const { page, limit } = getState().search.data.pagination.next;
      searchUrl += `&page=${page}&limit=${limit}`;
    }

    for (const key in filter) {
      if (filter[key] !== SEARCH_FILTER_ANY.type) {
        searchUrl += `&${key}=${filter[key]}`;
      }
    }

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
