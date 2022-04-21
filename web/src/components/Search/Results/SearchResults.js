// React
import React from 'react';

// Material
import { List, ListItem } from '@material-ui/core';

// Componets
import Result from './Result';

// Styles
import { useStyles } from './SearchResults-styles';

export const SearchResults = (props) => {
  // Variables
  const classes = useStyles();

  // JSX
  const final = (
    <div className={classes.root}>
      <List component="ul" aria-label="search results" className={classes.list}>
        {props.items.map((result) => {
          return (
            <ListItem key={result.id}>
              <Result
                id={result.id}
                url={result.url}
                title={result.title}
                crawledat={result.crawledAt}
                body={result.body}
                info={result.info}
              />
            </ListItem>
          );
        })}
      </List>
    </div>
  );

  return final;
};

export default SearchResults;
