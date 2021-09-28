// React
import React from "react";

// Redux
import { useDispatch } from "react-redux";

// Material
import { Button } from "@material-ui/core";

// Store
import {getWalletResults, getWebResults} from "../../../store/actions";

// Styles
import { useStyles } from "./MoreResults-styles";

const SearchMoreResults = (props) => {
  // Variables
  const classes = useStyles();
  const dispatch = useDispatch();
  const { query, source } = props;

  // Handlers
  const moreResultsHandler = () => {
     if (source === "web") {
      dispatch(getWebResults(query, true));
    } else {
      dispatch(getWalletResults(query, true));
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
