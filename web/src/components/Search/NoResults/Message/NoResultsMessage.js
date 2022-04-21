// React
import React from "react";

// Material
import { Card } from "@material-ui/core";

// Components
import Header from "./Header";
import Body from "./Body";

// Styles
import { useStyles } from "./NoResultsMessage-styles";

const NoResultsMessage = (props) => {
  // Variables
  const classes = useStyles();

  //JSX
  const view = (
    <div className={classes.root}>
      <Card variant="outlined" className={classes.card}>
        <div className={classes.content}>
          <Header query={props.query}></Header>
          <Body />
        </div>
      </Card>
    </div>
  );

  return view;
};

export default NoResultsMessage;
