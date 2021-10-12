// Axios
import axios from 'axios';

// Creators
import * as creators from './creators';

export const getStats = () => {
  return (dispatch) => {
    dispatch(creators.getStatsStart());
    axios
      .get('/statistics')
      .then((response) => {
        dispatch(creators.getStatsSuccess(response.data.data));
      })
      .catch((error) => {
        dispatch(creators.getStatsFailure(error));
      });
  };
};
