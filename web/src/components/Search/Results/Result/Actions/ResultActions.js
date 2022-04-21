// React
import React from 'react';

// CLSX
import clsx from 'clsx';

// Redux
import { useDispatch } from 'react-redux';

// Material
import {
  Label as TagIcon,
  ExpandMore as ExpandMoreIcon,
} from '@material-ui/icons';
import { CardActions, IconButton } from '@material-ui/core';

// Store
import { showTagDialog } from '../../../../../store/actions';

// Styles
import { useStyles } from './ResultActions-styles';

const ResultActions = (props) => {
  // Variables
  const classes = useStyles();
  const dispatch = useDispatch();
  const { expanded, clicked, id } = props;

  // Handlers
  const tagHandler = () => {
    dispatch(showTagDialog(id));
  };

  //JSX
  const view = (
    <div className={classes.root}>
      <CardActions disableSpacing>
        <IconButton onClick={tagHandler}>
          <TagIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={clicked}
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
    </div>
  );

  return view;
};

export default ResultActions;
