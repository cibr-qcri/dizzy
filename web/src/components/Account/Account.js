// React
import React from 'react';

// Redux
import { useSelector } from 'react-redux';

// Material
import { Typography } from '@material-ui/core';

// Components
import Form from './Form';
import Actions from './Actions';

// Styles
import { useStyles, Switcher } from './Account-styles';

export const Account = () => {
  //Variables
  const classes = useStyles();
  const userData = useSelector((state) => state.user.data);

  //JSX
  const view = (
    <div className={classes.root}>
      <Typography className={classes.typography}>
        Manage your account
      </Typography>
      <Form
        firstName={userData.firstName}
        lastName={userData.lastName}
        organization={userData.organization}
      />
      <Switcher
        question="Interesting search"
        action="Check this out"
        path="/search/web?query=wiki"
      />
      <Actions />
    </div>
  );

  return view;
};

export default Account;
