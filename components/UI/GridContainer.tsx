import React, { FC } from 'react';
import classes from './GridContainer.module.css';

const GridContainer: FC = (props) => {
  return <div className={classes.grid}>{props.children}</div>;
};

export default GridContainer;
