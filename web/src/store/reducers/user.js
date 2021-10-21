// Types
import * as types from '../actions/user/types';

// Utils
import { updateObject } from '../../utils';

// State
const initialState = {
  data: {},
  alerts: [],
  error: null,
  isBusy: false,
  signedUp: false,
  activated: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // Create
    case types.CREATE_ACCOUNT_START: {
      return updateObject(state, {
        error: null,
        isBusy: true,
      });
    }
    case types.CREATE_ACCOUNT_SUCCESS: {
      return updateObject(state, {
        isBusy: false,
        signedUp: true,
      });
    }
    case types.CREATE_ACCOUNT_FAILURE: {
      return updateObject(state, {
        error: action.payload,
        isBusy: false,
      });
    }
    case types.CREATE_ALERT_START: {
      return updateObject(state, {
        error: null,
        isBusy: true,
      });
    }
    case types.CREATE_ALERT_SUCCESS: {
      return updateObject(state, {
        isBusy: false,
      });
    }
    case types.CREATE_ALERT_FAILURE: {
      return updateObject(state, {
        error: action.payload,
        isBusy: false,
      });
    }
    case types.CREATE_FEEDBACK_START: {
      return updateObject(state, {
        error: null,
        isBusy: true,
      });
    }
    case types.CREATE_FEEDBACK_SUCCESS: {
      return updateObject(state, {
        isBusy: false,
      });
    }
    case types.CREATE_FEEDBACK_FAILURE: {
      return updateObject(state, {
        error: action.payload,
        isBusy: false,
      });
    }
    case types.CREATE_TAG_START: {
      return updateObject(state, {
        error: null,
        isBusy: true,
      });
    }
    case types.CREATE_TAG_SUCCESS: {
      return updateObject(state, {
        isBusy: false,
      });
    }
    case types.CREATE_TAG_FAILURE: {
      return updateObject(state, {
        error: action.payload,
        isBusy: false,
      });
    }
    // Get
    case types.GET_ACCOUNT_START: {
      return updateObject(state, {
        error: null,
        isBusy: true,
      });
    }
    case types.GET_ACCOUNT_SUCCESS: {
      return updateObject(state, {
        data: action.payload,
        isBusy: false,
      });
    }
    case types.GET_ACCOUNT_FAILURE: {
      return updateObject(state, {
        error: action.payload,
        isBusy: false,
      });
    }
    case types.GET_ALERTS_START: {
      return updateObject(state, {
        error: null,
        isBusy: true,
      });
    }
    case types.GET_ALERTS_SUCCESS: {
      return updateObject(state, {
        alerts: action.payload,
        isBusy: false,
      });
    }
    case types.GET_ALERTS_FAILURE: {
      return updateObject(state, {
        error: action.payload,
        isBusy: false,
      });
    }
    // Update
    case types.UPDATE_ACCOUNT_START: {
      return updateObject(state, {
        error: null,
        isBusy: true,
      });
    }
    case types.UPDATE_ACCOUNT_SUCCESS: {
      return updateObject(state, {
        data: action.payload,
        isBusy: false,
      });
    }
    case types.UPDATE_ACCOUNT_FAILURE: {
      return updateObject(state, {
        error: action.payload,
        isBusy: false,
      });
    }
    //Activate
    case types.ACTIVATE_ACCOUNT_START: {
      return updateObject(state, {
        error: null,
        isBusy: true,
      });
    }
    case types.ACTIVATE_ACCOUNT_SUCCESS: {
      return updateObject(state, {
        activated: true,
        isBusy: false,
      });
    }
    case types.ACTIVATE_ACCOUNT_FAILURE: {
      return updateObject(state, {
        error: action.payload,
        isBusy: false,
      });
    }
    // Delete
    case types.DELETE_ACCOUNT_START: {
      return updateObject(state, {
        error: null,
        isBusy: true,
      });
    }
    case types.DELETE_ACCOUNT_SUCCESS: {
      return initialState;
    }
    case types.DELETE_ACCOUNT_FAILURE: {
      return updateObject(state, {
        error: action.payload,
        isBusy: false,
      });
    }
    case types.DELETE_ALERT_START: {
      return updateObject(state, {
        error: null,
        isBusy: true,
      });
    }
    case types.DELETE_ALERT_SUCCESS: {
      return updateObject(state, {
        isBusy: false,
      });
    }
    case types.DELETE_ALERT_FAILURE: {
      return updateObject(state, {
        error: action.payload,
        isBusy: false,
      });
    }
    // Reset
    case types.RESET:
      return initialState;
    // Default
    default: {
      return state;
    }
  }
};

export default reducer;
