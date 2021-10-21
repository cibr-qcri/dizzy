// Axios
import axios from 'axios';

// Lodash
import _ from 'lodash';

// Redux
import { batch } from 'react-redux';

// Creators
import * as creators from './creators';
import { getAccountOnAuth, resetUser, resetSearch, showAlert } from '../';

export const createToken = (credentials) => {
  return (dispatch) => {
    dispatch(creators.createTokenStart());
    axios
      .post('auth/signin', credentials)
      .then((response) => {
        const authToken = response.data.token;
        localStorage.setItem('token', authToken);
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + authToken;
        dispatch(getAccountOnAuth(authToken, false));
      })
      .catch((error) => {
        batch(() => {
          dispatch(creators.createTokenFailure(error));
          dispatch(showAlert(_.get(error, 'response.data.error')));
        });
      });
  };
};

export const getToken = () => {
  return (dispatch) => {
    dispatch(creators.getTokenStart());
    const authToken = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + authToken;
    if (authToken) {
      dispatch(getAccountOnAuth(authToken));
    } else {
      dispatch(creators.getTokenFailure('token not found'));
    }
  };
};

export const deleteToken = () => {
  return (dispatch) => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    batch(() => {
      dispatch(creators.reset());
      dispatch(resetUser());
      dispatch(resetSearch());
    });
  };
};
