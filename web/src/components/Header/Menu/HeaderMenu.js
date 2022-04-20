// React
import React from 'react';

// Material
import { Drawer, Divider } from '@material-ui/core';

// Components
import General from './General';
import Settings from './Settings';
import Info from './Info';
import Outreach from './Outreach';

// Styles
import { useStyles } from './HeaderMenu-styles';

const HeaderMenu = (props) => {
  // Variables
  const classes = useStyles();
  const { open, onClose, isAuth } = props;

  //JSX
  const view = (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        anchor="left"
        open={open}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
      >
        <General onClose={onClose} />
        <Divider />
        <Settings onClose={onClose} isAuth={isAuth} />
        <Divider />
        <Info />
        <Divider />
        <Outreach onClose={onClose} isAuth={isAuth} />
      </Drawer>
    </div>
  );

  return view;
};

export default HeaderMenu;
