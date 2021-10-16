// Types
import * as types from '../actions/search/types';

// Shared
import { updateObject } from '../../utils';

// State
const initialState = {
  data: {
    query: '',
    filter: {},
    results: [],
    noResults: false,
    isPaged: false,
    pagination: {},
    source: 'web',
  },
  error: null,
  isBusy: true,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // Get
    case types.GET_RESULTS_START: {
      let sourceSwitched = state.data.source !== action.payload.source;
      return updateObject(state, {
        data: updateObject(state.data, {
          results: sourceSwitched ? [] : state.data.results,
          query: action.payload.query,
          isPaged: sourceSwitched ? false : action.payload.isPaged,
          pagination: sourceSwitched ? {} : state.data.pagination,
          noResults: sourceSwitched ? false : state.data.noResults,
          source: action.payload.source,
        }),
        isBusy: true,
      });
    }
    case types.GET_RESULTS_SUCCESS: {
      return updateObject(state, {
        data: updateObject(state.data, {
          results: state.data.isPaged
            ? state.data.results.concat(action.payload.data)
            : action.payload.data,
          noResults: !state.data.isPaged && action.payload.data.length === 0,
          pagination: { ...action.payload.pagination },
        }),
        isBusy: false,
      });
    }
    case types.GET_RESULTS_FAILURE: {
      return updateObject(state, {
        data: updateObject(state.data, {
          error: action.payload,
        }),
        isBusy: false,
      });
    }
    // Set
    case types.SET_FILTER: {
      return updateObject(state, {
        data: updateObject(state.data, {
          filter: action.payload,
        }),
      });
    }
    // Reset
    case types.RESET: {
      return initialState;
    }
    case types.RESET_FILTER: {
      return updateObject(state, {
        data: updateObject(state.data, {
          filter: initialState.data.filter,
        }),
      });
    }
    // Default
    default: {
      return state;
    }
  }
};

export default reducer;
