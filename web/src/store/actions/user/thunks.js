// Axios
import axios from 'axios';

// Lodash
import _ from 'lodash';

// Redux
import { batch } from 'react-redux';

// Creators
import * as creators from './creators';
import {
  createTokenSuccess,
  createTokenFailure,
  deleteToken,
  getTokenSuccess,
  getTokenFailure,
  getUserAlerts,
  resetAuth,
  resetSearch,
  showAlert,
} from '../';

// Create
export const createAccount = (data) => {
  return (dispatch) => {
    dispatch(creators.createAccountStart());
    axios
      .post('/auth/signup', data)
      .then(() => {
        batch(() => {
          dispatch(creators.createAccountSuccess());
          dispatch(showAlert('Activation email sent', 'success'));
        });
      })
      .catch((error) => {
        batch(() => {
          dispatch(creators.createAccountFailure(error));
          dispatch(showAlert());
        });
      });
  };
};

export const createAlert = (data) => {
  return (dispatch) => {
    dispatch(creators.createAlertStart());
    axios
      .post('/me/alerts', data)
      .then((_response) => {
        batch(() => {
          dispatch(creators.createAlertSuccess());
          dispatch(showAlert('Alert set. Thank you!', 'success'));
          dispatch(getUserAlerts());
        });
      })
      .catch((error) => {
        batch(() => {
          dispatch(creators.createAlertFailure(error));
          dispatch(showAlert());
        });
      });
  };
};

export const createFeedback = (data) => {
  return (dispatch) => {
    dispatch(creators.createFeedbackStart());
    axios
      .post('/me/feedbacks', data)
      .then((_response) => {
        batch(() => {
          dispatch(creators.createFeedbackSuccess());
          dispatch(showAlert('Feedback sent. Thank you!', 'success'));
        });
      })
      .catch((error) => {
        batch(() => {
          dispatch(creators.createFeedbackFailure(error));
          dispatch(showAlert());
        });
      });
  };
};

export const createTag = (data) => {
  return (dispatch) => {
    dispatch(creators.createTagStart());
    axios
      .post('/me/tags', data)
      .then((_response) => {
        batch(() => {
          dispatch(creators.createTagSuccess());
          dispatch(showAlert('Tag sent. Thank you!', 'success'));
        });
      })
      .catch((error) => {
        batch(() => {
          dispatch(creators.createTagFailure(error));
          dispatch(showAlert());
        });
      });
  };
};

// Get
export const getAccount = () => {
  return (dispatch) => {
    dispatch(creators.getAccountStart());
    axios
      .get('/me')
      .then((response) => {
        dispatch(creators.getAccountSuccess(response.data.data));
      })
      .catch((error) => {
        batch(() => {
          dispatch(creators.getAccountFailure(error));
          dispatch(showAlert());
        });
      });
  };
};

export const getAccountOnAuth = (authToken, storedToken = true) => {
  return (dispatch) => {
    dispatch(creators.getAccountStart());
    axios
      .get('/me')
      .then((response) => {
        batch(() => {
          dispatch(creators.getAccountSuccess(response.data.data));
          if (storedToken) {
            dispatch(getTokenSuccess(authToken));
          } else {
            dispatch(createTokenSuccess(authToken));
          }
        });
      })
      .catch((error) => {
        batch(() => {
          if (storedToken) {
            dispatch(getTokenFailure(error));
          } else {
            dispatch(createTokenFailure(error));
          }
          dispatch(creators.getAccountFailure(error));
          dispatch(showAlert());
        });
      });
  };
};

export const getAlerts = () => {
  return (dispatch) => {
    dispatch(creators.getAlertsStart());
    axios
      .get('/me/alerts')
      .then((response) => {
        dispatch(creators.getAlertsSuccess(response.data.data));
      })
      .catch((error) => {
        batch(() => {
          dispatch(creators.getAlertsFailure(error));
          dispatch(showAlert());
        });
      });
  };
};

// Update
export const updateAccount = (data) => {
  return (dispatch) => {
    dispatch(creators.updateAccountStart());
    axios
      .put('/me', data)
      .then((response) => {
        batch(() => {
          dispatch(creators.updateAccountSuccess(response.data.data));
          dispatch(showAlert('Account updated. Thank you!', 'success'));
        });
      })
      .catch((error) => {
        batch(() => {
          dispatch(creators.updateAccountFailure(error));
          dispatch(showAlert());
        });
      });
  };
};

// Activate
export const activateAccount = (token) => {
  return (dispatch) => {
    dispatch(creators.activateAccountStart());
    axios
      .get(`/auth/activate/${token}`)
      .then(() => {
        batch(() => {
          dispatch(creators.activateAccountSuccess());
          dispatch(showAlert('Account activated. Thank you!', 'success'));
        });
      })
      .catch((error) => {
        batch(() => {
          dispatch(creators.activateAccountFailure(error));
          dispatch(showAlert(_.get(error, 'response.data.error')));
        });
      });
  };
};

// Delete
export const deleteAccount = () => {
  return (dispatch) => {
    dispatch(creators.deleteAccountStart());
    axios
      .delete('/me')
      .then((_response) => {
        batch(() => {
          dispatch(creators.deleteAccountSuccess());
          dispatch(showAlert('Account deleted. Come again!', 'success'));
          dispatch(deleteToken());
          dispatch(resetAuth());
          dispatch(resetSearch());
        });
      })
      .catch((error) => {
        batch(() => {
          dispatch(creators.deleteAccountFailure(error));
          dispatch(showAlert());
        });
      });
  };
};

export const deleteAlert = (id) => {
  return (dispatch) => {
    dispatch(creators.deleteAlertStart());
    axios
      .delete('/me/alerts/' + id)
      .then((_response) => {
        batch(() => {
          dispatch(creators.deleteAlertSuccess());
          dispatch(getAccount());
          dispatch(getUserAlerts());
        });
      })
      .catch((error) => {
        batch(() => {
          dispatch(creators.deleteAlertFailure(error));
          dispatch(showAlert());
        });
      });
  };
};
