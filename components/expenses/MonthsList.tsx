import React, { FC } from 'react';
import { Month } from '../month.model';
import CardLink from '../UI/CardLink';
import GridContainer from '../UI/GridContainer';
import classes from './MonthsList.module.css';

interface Props {
  items: Month[];
}

const MonthsList: FC<Props> = ({ items }) => {
  return (
    <>
      <h2 className={classes.title}>Saved months appear below</h2>
      <GridContainer>
        {items.map((month: Month) => (
          <CardLink key={month.id} linkTo={'expenses/' + month.id}>
            <h3>{month.month} &rarr;</h3>
            <p>
              {month.person1}&{month.person2}
            </p>
          </CardLink>
        ))}
      </GridContainer>
    </>
  );
};

export default MonthsList;
