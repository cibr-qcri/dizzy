// React
import React, { useEffect } from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Router
import { Redirect } from 'react-router-dom';

// Material
import { Typography } from '@material-ui/core';

// Components
import Form from './Form';

// Store
import { resetRedirect } from '../../store/actions';

// Styles
import { useStyles, Logo, Switcher } from './SignIn-styles';

export const SignIn = () => {
  // Variables
  const classes = useStyles();
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.data.token !== null);
  const redirectTo = useSelector((state) => state.auth.data.redirectTo);
  const signedUp = useSelector((state) => state.user.signedUp);

  // Hooks
  useEffect(() => {
    return () => isAuth && dispatch(resetRedirect());
  }, [dispatch, isAuth]);

  // JSX
  let switcher = (
    <Switcher
      question="Don't have an account"
      action="Sign up"
      path="/signup"
    />
  );

  if (signedUp) {
    switcher = null;
  }

  let view = (
    <div className={classes.root}>
      <Logo />
      <Typography className={classes.typography}>
        Sign in with your account
      </Typography>
      <Form />
      {switcher}
    </div>
  );

  if (isAuth) {
    if (redirectTo) {
      view = <Redirect to={redirectTo} />;
    } else {
      view = <Redirect to="/main" />;
    }
  }

  return view;
};

export default SignIn;
