// React
import React, { Fragment, useEffect } from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Router
import { useLocation } from 'react-router-dom';

// Querystring
import qs from 'qs';

// Components
import Results from './Results';
import MoreResults from './MoreResults';
import NoResults from './NoResults';

// Store
import { getResults, showAlertDialog } from '../../store/actions';

// Styles
import { useStyles, LazyProgress, SearchBox, Switcher } from './Search-styles';

export const Search = () => {
  // Variables
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  const isBusy = useSelector((state) => state.search.isBusy);
  const query = useSelector((state) => state.search.data.query);
  const filter = useSelector((state) => state.search.data.filter);
  const results = useSelector((state) => state.search.data.results);
  const noResults = useSelector((state) => state.search.data.noResults);
  const pagination = useSelector((state) => state.search.data.pagination);

  // Hooks
  useEffect(() => {
    const query = qs.parse(location.search, { ignoreQueryPrefix: true }).query;
    dispatch(getResults(query, filter));
  }, [dispatch, filter, location]);

  // Handlers
  const alertHandler = () => {
    dispatch(showAlertDialog(query));
  };

  // JSX
  let moreResults = null;
  if (pagination.next) {
    moreResults = <MoreResults query={query} filter={filter} />;
  }

  let content = (
    <Fragment>
      <Results items={results} />
      {moreResults}
      <Switcher
        question="Want to stay updated"
        action="Set an alert"
        clicked={alertHandler}
      />
    </Fragment>
  );

  if (noResults) {
    content = <NoResults query={query} />;
  }
  const view = (
    <div className={classes.root}>
      <SearchBox />
      {isBusy && !pagination.next ? <LazyProgress /> : content}
    </div>
  );

  return view;
};

export default Search;
