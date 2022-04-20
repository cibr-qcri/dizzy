// React
import React from 'react';

// Redux
import { useDispatch } from 'react-redux';

// Material
import {
  Twitter as TwitterIcon,
  ContactMail as ContactUsIcon,
  Feedback as FeedbackIcon,
} from '@material-ui/icons';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from '@material-ui/core';

// Store
import { showFeedbackDialog } from '../../../../store/actions';

// Styles
import { useStyles } from './MenuOutreach-styles';

const MenuOutreach = (props) => {
  // Variables
  const classes = useStyles();
  const dispatch = useDispatch();
  const { onClose, isAuth } = props;
  const twitterLink = 'https://twitter.com/QatarComputing';
  const contactLink = 'mailto:yboshmaf@hbku.edu.qa?subject=Hello!';

  // Handlers
  const feedbackHandler = () => {
    onClose();
    dispatch(showFeedbackDialog());
  };

  //JSX
  const header = (
    <ListSubheader className={classes.header}>Keep in Touch</ListSubheader>
  );

  let feedback = null;
  if (isAuth) {
    feedback = (
      <ListItem button component="a" onClick={feedbackHandler}>
        <ListItemIcon>
          <FeedbackIcon />
        </ListItemIcon>
        <ListItemText primary="Send Feedback" />
      </ListItem>
    );
  }

  const view = (
    <div className={classes.root}>
      <List className={classes.list} subheader={header}>
        <ListItem
          button
          component="a"
          href={twitterLink}
          target="_blank"
          rel="noopener"
        >
          <ListItemIcon>
            <TwitterIcon />
          </ListItemIcon>
          <ListItemText primary="Twitter" />
        </ListItem>
        <ListItem button component="a" href={contactLink} onClick={onClose}>
          <ListItemIcon>
            <ContactUsIcon />
          </ListItemIcon>
          <ListItemText primary="Contact Us" />
        </ListItem>
        {feedback}
      </List>
    </div>
  );

  return view;
};

export default MenuOutreach;
