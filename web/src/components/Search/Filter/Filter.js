// React
import React from 'react';

// Components
import FilterForm from './Form/FilterForm';

// Styles
import { useStyles } from './Filter-styles';

const SearchFilter = (props) => {
  // Variables
  const classes = useStyles();

  //JSX
  const view = (
    <div className={classes.root}>
      <FilterForm />
    </div>
  );

  return view;
};

export default SearchFilter;
