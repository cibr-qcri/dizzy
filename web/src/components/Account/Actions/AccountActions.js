// React
import React from 'react';

// Router
import { useHistory } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Store
import {
  deleteAccount,
  deleteToken,
  hidePromptDialog,
  showPromptDialog,
} from '../../../store/actions';

// Styles
import { useStyles, PromptDialog, Button } from './AccountActions-styles';

const AccountActions = (props) => {
  // Variables
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const isBusy = useSelector((state) => state.auth.isBusy);

  // Handlers
  const signOutHandler = (event) => {
    event.preventDefault();
    dispatch(deleteToken());
    history.push('/main');
  };

  const confirmDeleteAccountHandler = (event) => {
    event.preventDefault();
    dispatch(hidePromptDialog());
    dispatch(deleteAccount());
    history.push('/main');
  };

  const deleteAccountHandler = (event) => {
    event.preventDefault();
    dispatch(showPromptDialog());
  };

  // JSX
  const view = (
    <div className={classes.root}>
      <Button onClick={signOutHandler} title="Sign out" loading={isBusy} />
      <Button
        color="secondary"
        type="submit"
        onClick={deleteAccountHandler}
        title="Delete Account"
      />
      <PromptDialog
        title="Delete Account"
        content="Are you sure you want to delete your account?"
        onConfirm={confirmDeleteAccountHandler}
      />
    </div>
  );

  return view;
};

export default AccountActions;
