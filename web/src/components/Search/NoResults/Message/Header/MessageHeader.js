// React
import React from "react";

// Material
import { Typography } from "@material-ui/core";

// Styles
import { useStyles } from "./MessageHeader-styles";

const MessageHeader = (props) => {
  // Variables
  const classes = useStyles();

  //JSX
  const view = (
    <div className={classes.root}>
      <Typography className={classes.typography}>
        No results found for <b>{props.query}</b>.
      </Typography>
    </div>
  );

  return view;
};

export default MessageHeader;
