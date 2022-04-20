// React
import React from "react";

// Material
import { Typography } from "@material-ui/core";

// Styles
import { useStyles } from "./Footer-styles";

const Footer = () => {
  // Variables
  const classes = useStyles();

  //JSX
  const view = (
    <div className={classes.root}>
      <Typography variant="caption">
        &copy; 2022 CIBR &mdash; An initiative by QCRI
      </Typography>
    </div>
  );

  return view;
};

export default Footer;
