// React
import React from 'react';

// Redux
import { useDispatch } from 'react-redux';

// Material
import { Button } from '@material-ui/core';

// Store
import { getWebResults } from '../../../store/actions';

// Styles
import { useStyles } from './MoreResults-styles';

const SearchMoreResults = (props) => {
  // Variables
  const classes = useStyles();
  const dispatch = useDispatch();
  const { query, filter, source } = props;

  // Handlers
  const moreResultsHandler = () => {
    if (source === 'web') {
      dispatch(getWebResults(query, filter, true));
    }
  };

  //JSX
  const view = (
    <div className={classes.root}>
      <Button
        className={classes.button}
        variant="outlined"
        color="primary"
        onClick={moreResultsHandler}
      >
        More Results
      </Button>
    </div>
  );

  return view;
};

export default SearchMoreResults;
