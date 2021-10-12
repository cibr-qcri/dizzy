// Types
import * as types from './types';

// Get
export const getStatsStart = () => ({
  type: types.GET_STATS_START,
});

export const getStatsSuccess = (data) => ({
  type: types.GET_STATS_SUCCESS,
  payload: data,
});

export const getStatsFailure = (error) => ({
  type: types.GET_STATS_FAILURE,
  payload: error,
});

// Reset
export const reset = () => ({
  type: types.RESET,
});
