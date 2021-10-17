// React
import React, { useState, useEffect, Fragment } from 'react';

// PropTypes
import PropTypes from 'prop-types';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Router
import { useHistory } from 'react-router-dom';

// Material
import {
  FilterList as FilterListIcon,
  Search as SearchIcon,
} from '@material-ui/icons';
import { Divider, IconButton, InputBase, Paper } from '@material-ui/core';

// Store
import { resetFilter, setRedirect } from '../../store/actions';

// Components
import FilterScrollList from './FilterScrollList';

const SearchBoxRaw = (props) => {
  // Variables
  const {
    classes,
    placeholder = 'Search the darkweb',
    enableFilter = true,
  } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  const [query, setQuery] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const lastQuery = useSelector((state) => state.search.data.query);
  const isAuth = useSelector((state) => state.auth.data.token !== null);

  // Hooks
  useEffect(() => {
    setQuery(lastQuery);
  }, [lastQuery]);

  // Handlers
  const filterShowHandler = () => {
    setShowFilter(!showFilter);

    // Reset filter when hidden
    if (showFilter) {
      dispatch(resetFilter());
    }
  };

  const queryChangeHandler = (event) => {
    const query = event.target.value;
    setQuery(query);
  };

  const querySubmitHandler = (event) => {
    event.preventDefault();
    if (query.trim() !== '') {
      const location = {
        pathname: '/search/web',
        search: '?query=' + query,
      };
      if (isAuth) {
        history.push(location);
      } else {
        dispatch(setRedirect(location));
        history.push('/signin');
      }
    }
  };

  // JSX
  let filterScrollList = null;
  if (enableFilter && showFilter) {
    filterScrollList = <FilterScrollList />;
  }

  let filterDivier = null;
  if (enableFilter) {
    filterDivier = (
      <Fragment>
        <Divider className={classes.divider} orientation="vertical" />
        <IconButton
          color={showFilter ? 'primary' : 'default'}
          onClick={filterShowHandler}
        >
          <FilterListIcon />
        </IconButton>
      </Fragment>
    );
  }

  const view = (
    <div className={classes.root}>
      <Paper
        component="form"
        className={classes.paper}
        variant="outlined"
        onSubmit={querySubmitHandler}
      >
        <IconButton type="submit" aria-label="search">
          <SearchIcon />
        </IconButton>
        <InputBase
          className={classes.input}
          type="search"
          value={query}
          placeholder={placeholder}
          onChange={queryChangeHandler}
        />
        {filterDivier}
      </Paper>
      {filterScrollList}
    </div>
  );

  return view;
};

// Typechecking
SearchBoxRaw.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
    paper: PropTypes.string.isRequired,
    input: PropTypes.string.isRequired,
  }),
  placeholder: PropTypes.string,
  enableFilter: PropTypes.bool,
};

// Dynamic styling
SearchBoxRaw.styledAs = 'SearchBoxRaw';

export default SearchBoxRaw;
