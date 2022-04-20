// React
import React from 'react';

// Material
import {
  Info as AboutUsIcon,
  LocalLibrary as ResearchIcon,
} from '@material-ui/icons';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from '@material-ui/core';

// Styles
import { useStyles } from './MenuInfo-styles';

const MenuInfo = () => {
  // Variables
  const classes = useStyles();
  const aboutLink = 'https://cibr.qcri.org';
  const researchLink = 'https://cibr.qcri.org/research.html';

  //JSX
  const header = (
    <ListSubheader className={classes.header}>Who We Are</ListSubheader>
  );

  const view = (
    <div className={classes.root}>
      <List className={classes.list} subheader={header}>
        <ListItem
          button
          component="a"
          href={aboutLink}
          target="_blank"
          rel="noopener"
        >
          <ListItemIcon>
            <AboutUsIcon />
          </ListItemIcon>
          <ListItemText primary="About Us" />
        </ListItem>
        <ListItem
          button
          component="a"
          href={researchLink}
          target="_blank"
          rel="noopener"
        >
          <ListItemIcon>
            <ResearchIcon />
          </ListItemIcon>
          <ListItemText primary="Our Research" />
        </ListItem>
      </List>
    </div>
  );

  return view;
};

export default MenuInfo;
