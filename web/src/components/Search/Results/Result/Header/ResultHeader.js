// React
import React from 'react';

// Material
import { Typography } from '@material-ui/core';

// Styles
import { useStyles, TorIcon } from './ResultHeader-styles';

const ResultHeader = (props) => {
  // Variables
  const classes = useStyles();

  //JSX
  const view = (
    <div className={classes.root}>
      <TorIcon fontSize="inherit" />
      <Typography color="textSecondary" variant="caption">
        {props.url}
      </Typography>
    </div>
  );

  return view;
};

export default ResultHeader;
