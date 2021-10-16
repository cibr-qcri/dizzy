// React
import React from 'react';

// Components
import FilterForm from './Form/FilterForm';

// Styles
import { useStyles } from './FilterScrollList-styles';

const SearchFilterScrollList = () => {
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

export default SearchFilterScrollList;
