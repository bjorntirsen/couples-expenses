import { FC } from 'react';
import classes from './SectionTitle.module.css';

interface Props {
  title: string;
  subtitle: string;
}

const SectionTitle: FC<Props> = ({ title, subtitle }) => {
  return (
    <>
      <h1 className={classes.title}>{title}</h1>
      <p className={classes.description}>{subtitle}</p>
    </>
  );
};

export default SectionTitle;
