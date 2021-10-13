// React
import React, { useEffect, useState } from 'react';

// PropTypes
import PropTypes from 'prop-types';

// Numeral
import numeral from 'numeral';

// Material
import { Typography } from '@material-ui/core';

const StatRaw = (props) => {
  // Variables
  const { classes, value = 0, text } = props;
  const [animatedValue, setAnimatedValue] = useState(value);

  // Hooks
  useEffect(() => {
    let timer = setInterval(() => {
      value && setAnimatedValue(value);
    }, 1000);
    return () => value && clearInterval(timer);
  }, [value]);

  // JSX
  const view = (
    <div className={classes.root}>
      <Typography variant="h5" color="primary">
        {animatedValue === 0 ? 'N/A' : numeral(animatedValue).format('0.0a')}
      </Typography>
      <Typography variant="body1">{text}</Typography>
    </div>
  );

  return view;
};

// Typechecking
StatRaw.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
  }),
  value: PropTypes.number,
  text: PropTypes.string.isRequired,
};

// Dynamic styling
StatRaw.styledAs = 'StatRaw';

export default StatRaw;
