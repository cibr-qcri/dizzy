// Types
import * as types from './types';

// Get
export const getResultsStart = (query) => ({
  type: types.GET_RESULTS_START,
  payload: query,
});

export const getResultsSuccess = (data) => ({
  type: types.GET_RESULTS_SUCCESS,
  payload: data,
});

export const getResultsFailure = (error) => ({
  type: types.GET_RESULTS_FAILURE,
  payload: error,
});

// Set
export const setFilter = (filter) => ({
  type: types.SET_FILTER,
  payload: filter,
});

// Reset
export const reset = () => ({
  type: types.RESET,
});

export const resetFilter = () => ({
  type: types.RESET_FILTER,
});
