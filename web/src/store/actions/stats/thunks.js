// Axios
import axios from 'axios';

// Creators
import * as creators from './creators';

export const getStats = (type = 'index') => {
  return (dispatch) => {
    dispatch(creators.getStatsStart());
    axios
      .get(`/statistics?type=${type}`)
      .then((response) => {
        dispatch(creators.getStatsSuccess(response.data.data));
      })
      .catch((error) => {
        dispatch(creators.getStatsFailure(error));
      });
  };
};
