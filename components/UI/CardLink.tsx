import { FC } from 'react';
import classes from './CardLink.module.css';

interface Props {
  linkTo: string;
}

const CardLink: FC<Props> = ({ linkTo, children }) => {
  return (
    <a href={linkTo} className={classes.card}>
      {children}
    </a>
  );
};

export default CardLink;
