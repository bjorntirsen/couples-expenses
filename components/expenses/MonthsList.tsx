import React, { FC } from 'react';
import { Month } from '../month.model';
import GridContainer from '../UI/GridContainer';
import MonthCard from './MonthCard';
import classes from './MonthsList.module.css';

interface Props {
  items: Month[];
  onDeleteMonth: (a: string) => any;
}

const MonthsList: FC<Props> = ({ items, onDeleteMonth }) => {
  return (
    <>
      <h2 className={classes.title}>Saved months appear below</h2>
      <GridContainer>
        {items.map((month: Month) => (
          <MonthCard
            key={month.id}
            month={month}
            onDeleteMonth={onDeleteMonth}
          />
        ))}
      </GridContainer>
    </>
  );
};

export default MonthsList;
