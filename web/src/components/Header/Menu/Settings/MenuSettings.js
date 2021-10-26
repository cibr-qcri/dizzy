// React
import React from 'react';

// Router
import { NavLink } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Material
import {
  AccountCircle as AccountIcon,
  Notifications as AlertIcon,
  Brightness4 as DarkModeIcon,
} from '@material-ui/icons';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  ListSubheader,
  Switch,
} from '@material-ui/core';

// Store
import { setThemeMode } from '../../../../store/actions';

// Styles
import { useStyles } from './MenuSettings-styles';

const MenuSettings = (props) => {
  // Variables
  const classes = useStyles();
  const dispatch = useDispatch();
  const isDark = useSelector((state) => state.theme.palette.type === 'dark');
  const { onClose, isAuth } = props;

  // Handlers
  const toggleDarkModeHandler = (event) => {
    if (event.target.checked) {
      dispatch(setThemeMode('dark'));
    } else {
      dispatch(setThemeMode('light'));
    }
  };

  //JSX
  const header = (
    <ListSubheader className={classes.header}>Settings</ListSubheader>
  );

  let account = null;
  if (isAuth) {
    account = (
      <ListItem button component={NavLink} to="/account" onClick={onClose}>
        <ListItemIcon>
          <AccountIcon />
        </ListItemIcon>
        <ListItemText primary="Account" />
      </ListItem>
    );
  }

  let alerts = null;
  if (isAuth) {
    alerts = (
      <ListItem button component={NavLink} to="/alerts" onClick={onClose}>
        <ListItemIcon>
          <AlertIcon />
        </ListItemIcon>
        <ListItemText primary="Alerts" />
      </ListItem>
    );
  }

  const darkMode = (
    <ListItem>
      <ListItemIcon>
        <DarkModeIcon />
      </ListItemIcon>
      <ListItemText primary="Dark Mode" />
      <ListItemSecondaryAction>
        <Switch
          color="primary"
          edge="end"
          onChange={toggleDarkModeHandler}
          checked={isDark}
        />
      </ListItemSecondaryAction>
    </ListItem>
  );

  const view = (
    <div className={classes.root}>
      <List className={classes.list} subheader={header}>
        {account}
        {alerts}
        {darkMode}
      </List>
    </div>
  );

  return view;
};

export default MenuSettings;
