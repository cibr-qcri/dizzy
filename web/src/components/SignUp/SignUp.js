// React
import React from 'react';

// Redux
import { useSelector } from 'react-redux';

// Router
import { Redirect } from 'react-router-dom';

// Material
import { Typography } from '@material-ui/core';

// Components
import Form from './Form';

// Styles
import { useStyles, Logo, Switcher } from './SignUp-styles';

export const SignUp = () => {
  // Variables
  const classes = useStyles();
  const signedUp = useSelector((state) => state.user.signedUp);

  // JSX
  let view = (
    <div className={classes.root}>
      <Logo />
      <Typography className={classes.typography}>
        Sign up for a new account
      </Typography>
      <Form />
      <Switcher
        question="Already have an account"
        action="Sign in"
        path="/signin"
      />
    </div>
  );

  if (signedUp) {
    view = <Redirect to="/signin" />;
  }

  return view;
};

export default SignUp;
