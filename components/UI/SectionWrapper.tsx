import { FC } from 'react';
import classes from './SectionWrapper.module.css';

const SectionWrapper: FC = (props) => {
  return <section className={classes.section}>{props.children}</section>;
};

export default SectionWrapper;
