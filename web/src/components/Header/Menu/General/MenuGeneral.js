// React
import React from 'react';
import { NavLink } from 'react-router-dom';

// Material
import {
  Home as MainIcon,
  Input as LoginIcon,
  LibraryBooks as TermsIcon,
} from '@material-ui/icons';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

// Styles
import { useStyles } from './MenuGeneral-styles';
import { useSelector } from 'react-redux';

const MenuGeneral = (props) => {
  // Variables
  const classes = useStyles();
  const { onClose } = props;
  const isAuth = useSelector((state) => state.auth.data.token !== null);

  let loginItem = null;

  // JSX
  if (!isAuth) {
    loginItem = (
      <ListItem
        button
        component={NavLink}
        to="/signin"
        rel="noopener"
        onClick={onClose}
      >
        <ListItemIcon>
          <LoginIcon />
        </ListItemIcon>
        <ListItemText primary="Sign In" />
      </ListItem>
    );
  }

  const view = (
    <div className={classes.root}>
      <List className={classes.list}>
        <ListItem
          button
          component={NavLink}
          to="/"
          rel="noopener"
          onClick={onClose}
        >
          <ListItemIcon>
            <MainIcon />
          </ListItemIcon>
          <ListItemText primary="Main" />
        </ListItem>
        <ListItem
          button
          component={NavLink}
          to="/terms"
          rel="noopener"
          onClick={onClose}
        >
          <ListItemIcon>
            <TermsIcon />
          </ListItemIcon>
          <ListItemText primary="Terms" />
        </ListItem>
        {loginItem}
      </List>
    </div>
  );

  return view;
};

export default MenuGeneral;
