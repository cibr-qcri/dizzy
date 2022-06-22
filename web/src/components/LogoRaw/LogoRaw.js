// React
import React from 'react';

// PropTypes
import PropTypes from 'prop-types';

// Assets
import logo from '../../assets/images/dizzy-logo.png';

// Router
import { NavLink } from 'react-router-dom';

// Material
import { Link } from '@material-ui/core';

const LogoRaw = (props) => {
  // Variables
  const { classes, height = 100 } = props;

  // JSX
  const view = (
    <div className={classes.root}>
      <Link className={classes.link} component={NavLink} to="/">
        <img src={logo} alt="Dizzy" height={height} />
      </Link>
    </div>
  );

  return view;
};

// Typechecking
LogoRaw.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
  }),
  height: PropTypes.number,
};

// Dynamic styling
LogoRaw.styledAs = 'LogoRaw';

export default LogoRaw;
