// React
import React from "react";

// Material
import { Typography } from "@material-ui/core";

// Styles
import { useStyles } from "./MessageBody-styles";

const MessageBody = (props) => {
  // Variables
  const classes = useStyles();
  const suggestions = [
    "Make sure all keywords are spelled correctly.",
    "Try different keywords.",
    "Try more general keywords.",
    "Try fewer keywords.",
  ];

  //JSX
  const view = (
    <div className={classes.root}>
      <Typography>Suggestions:</Typography>
      <ul className={classes.list}>
        {suggestions.map((suggestion, index) => (
          <li key={index}>
            <Typography>{suggestion}</Typography>
          </li>
        ))}
      </ul>
    </div>
  );

  return view;
};

export default MessageBody;
