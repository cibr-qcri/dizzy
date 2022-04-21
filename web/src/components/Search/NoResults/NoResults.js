// React
import React from 'react';

// Components
import Message from './Message';

// Styles
import { useStyles, Switcher } from './NoResults-styles';

const SearchNoResults = (props) => {
  // Variables
  const classes = useStyles();

  //JSX
  const view = (
    <div className={classes.root}>
      <Message query={props.query} />
      <Switcher
        question="Interesting search"
        action="Check this out"
        path="/search/search?query=wiki"
      />
    </div>
  );

  return view;
};

export default SearchNoResults;
