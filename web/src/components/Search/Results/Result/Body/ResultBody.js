// React
import React from 'react';

// Moment
import moment from 'moment';

// Material
import { Typography } from '@material-ui/core';

// Styles
import { useStyles } from './ResultBody-styles';

const ResultBody = (props) => {
  // Variables
  const classes = useStyles();

  //JSX
  const view = (
    <div className={classes.root}>
      <Typography variant="body2" component="p" className={classes.typography}>
        <Typography color="textSecondary" variant="caption">
          {moment(props.date).format('LL')}&nbsp;&middot;&nbsp;
        </Typography>
        {props.text}
      </Typography>
    </div>
  );

  return view;
};

export default ResultBody;
