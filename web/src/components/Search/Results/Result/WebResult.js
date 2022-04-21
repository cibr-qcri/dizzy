// React
import React, { Fragment, useState } from 'react';

// Material
import { Card } from '@material-ui/core';

// Components
import Header from './Header';
import Title from './Title';
import Body from './Body';
import Actions from './Actions';
import Info from './Info';

// Styles
import { useStyles } from './WebResult-styles';

const WebResult = (props) => {
  // Variables
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const { id, info, url, title, crawledat, body } = props;

  // Handlers
  const expandCardHandler = () => {
    setExpanded(!expanded);
  };

  //JSX
  let expansion = (
    <Fragment>
      <Actions expanded={expanded} id={id} clicked={expandCardHandler} />
      <Info expanded={expanded} items={info} />
    </Fragment>
  );
  if (expanded) {
    expansion = (
      <Fragment>
        <Info expanded={expanded} items={info} />
        <Actions expanded={expanded} clicked={expandCardHandler} />
      </Fragment>
    );
  }

  const view = (
    <div className={classes.root}>
      <Card variant="outlined">
        <Header url={url} />
        <Title text={title} url={url} />
        <Body date={crawledat} text={body} />
        {expansion}
      </Card>
    </div>
  );

  return view;
};

export default WebResult;
