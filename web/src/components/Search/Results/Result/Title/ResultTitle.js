// React
import React from "react";

// Material
import { Link, Typography } from "@material-ui/core";

// Styles
import { useStyles } from "./ResultTitle-styles";

const ResultTitle = (props) => {
  // Variables
  const classes = useStyles();

  //JSX
  const view = (
    <div className={classes.root}>
      <Typography className={classes.typography}>
        <Link
          className={classes.link}
          href={props.url}
          target="_blank"
          rel="noopener"
        >
          {props.text}
        </Link>
      </Typography>
    </div>
  );

  return view;
};

export default ResultTitle;
