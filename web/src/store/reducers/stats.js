// Types
import * as types from '../actions/stats/types';

// Shared
import { updateObject } from '../../utils';

// State
const initialState = {
  data: {
    computed: {
      count: {
        page: 0,
        domain: 0,
        crypto: {
          btc: 0,
        },
      },
    },
  },
  error: null,
  isBusy: true,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // Get
    case types.GET_STATS_START:
      return updateObject(state, {
        isBusy: true,
      });
    case types.GET_STATS_SUCCESS:
      return updateObject(state, {
        data: action.payload,
        isBusy: false,
      });
    case types.GET_STATS_FAILURE:
      return updateObject(state, {
        error: action.payload,
        isBusy: false,
      });
    // Reset
    case types.RESET: {
      return initialState;
    }
    // Default
    default:
      return state;
  }
};

export default reducer;
