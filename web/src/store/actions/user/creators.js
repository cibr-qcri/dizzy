// Types
import * as types from './types';

// Create
export const createAccountStart = () => ({
  type: types.CREATE_ACCOUNT_START,
});

export const createAccountSuccess = () => ({
  type: types.CREATE_ACCOUNT_SUCCESS,
});

export const createAccountFailure = (error) => ({
  type: types.CREATE_ACCOUNT_FAILURE,
  payload: error,
});

export const createAlertStart = () => ({
  type: types.CREATE_ALERT_START,
});

export const createAlertSuccess = () => ({
  type: types.CREATE_ALERT_SUCCESS,
});

export const createAlertFailure = (error) => ({
  type: types.CREATE_ALERT_FAILURE,
  payload: error,
});

export const createFeedbackStart = () => ({
  type: types.CREATE_FEEDBACK_START,
});

export const createFeedbackSuccess = () => ({
  type: types.CREATE_FEEDBACK_SUCCESS,
});

export const createFeedbackFailure = (error) => ({
  type: types.CREATE_FEEDBACK_FAILURE,
  payload: error,
});

export const createTagStart = () => ({
  type: types.CREATE_TAG_START,
});

export const createTagSuccess = () => ({
  type: types.CREATE_TAG_SUCCESS,
});

export const createTagFailure = (error) => ({
  type: types.CREATE_TAG_FAILURE,
  payload: error,
});

// Get
export const getAccountStart = () => ({
  type: types.GET_ACCOUNT_START,
});

export const getAccountSuccess = (data) => ({
  type: types.GET_ACCOUNT_SUCCESS,
  payload: data,
});

export const getAccountFailure = (error) => ({
  type: types.GET_ACCOUNT_FAILURE,
  payload: error,
});

export const getAlertsStart = () => ({
  type: types.GET_ALERTS_START,
});

export const getAlertsSuccess = (data) => ({
  type: types.GET_ALERTS_SUCCESS,
  payload: data,
});

export const getAlertsFailure = (error) => ({
  type: types.GET_ALERTS_FAILURE,
  payload: error,
});

// Update
export const updateAccountStart = () => ({
  type: types.UPDATE_ACCOUNT_START,
});

export const updateAccountSuccess = (data) => ({
  type: types.UPDATE_ACCOUNT_SUCCESS,
  payload: data,
});

export const updateAccountFailure = (error) => ({
  type: types.UPDATE_ACCOUNT_FAILURE,
  payload: error,
});

// Activate
export const activateAccountStart = () => ({
  type: types.ACTIVATE_ACCOUNT_START,
});

export const activateAccountSuccess = () => ({
  type: types.ACTIVATE_ACCOUNT_SUCCESS,
});

export const activateAccountFailure = (error) => ({
  type: types.ACTIVATE_ACCOUNT_FAILURE,
  payload: error,
});

// Delete
export const deleteAccountStart = () => ({
  type: types.DELETE_ACCOUNT_START,
});

export const deleteAccountSuccess = () => ({
  type: types.DELETE_ACCOUNT_SUCCESS,
});

export const deleteAccountFailure = (error) => ({
  type: types.DELETE_ACCOUNT_FAILURE,
  payload: error,
});

export const deleteAlertStart = () => ({
  type: types.DELETE_ALERT_START,
});

export const deleteAlertSuccess = () => ({
  type: types.DELETE_ALERT_SUCCESS,
});

export const deleteAlertFailure = (error) => ({
  type: types.DELETE_ALERT_FAILURE,
  payload: error,
});

// Reset
export const reset = () => ({
  type: types.RESET,
});
