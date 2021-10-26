// React
import React from 'react';

// Material
import { Typography } from '@material-ui/core';

// Styles
import { useStyles, Feature } from './Analytics-styles';

const MainAnalytics = () => {
  // Variables
  const classes = useStyles();

  // JSX
  const view = (
    <div className={classes.root}>
      <Typography className={classes.title} color="primary" variant="h5">
        Darkweb analytics
      </Typography>
      <Typography className={classes.subtitle}>
        Get useful insights with your search results
      </Typography>
      <div className={classes.features}>
        <Feature iconLigature="category" text="Website categorization" />
        <Feature iconLigature="token" text="Crypto address attribution" />
        <Feature iconLigature="security" text="Illicit website detection" />
        <Feature iconLigature="lock" text="User tracking detection" />
        <Feature
          iconLigature="content_copy"
          text="Mirrored website detection"
        />
        <Feature iconLigature="language" text="Website language detection" />
        <Feature iconLigature="offline_bolt" text="Service status check" />
      </div>
    </div>
  );

  return view;
};

export default MainAnalytics;
