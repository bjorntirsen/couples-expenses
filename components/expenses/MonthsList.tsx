import React, { FC } from 'react';
import { Month } from '../month.model';
import Card from '../UI/Card';
import GridContainer from '../UI/GridContainer';
import classes from './MonthsList.module.css';

interface Props {
  items: Month[];
  onDeleteMonth: (a: string) => void;
}

const MonthsList: FC<Props> = ({ items, onDeleteMonth }) => {
  return (
    <>
      <h2 className={classes.title}>Saved months appear below</h2>
      <GridContainer>
        {items.map((month: Month) => (
          <Card key={month.id}>
            <h3>{month.month}</h3>
            <p>
              {month.person1}&{month.person2}
            </p>
            <div className={classes.btn_container}>
              <a href={`expenses/${month.id}`} className={classes.btn}>
                View
              </a>
              <button
                className={classes.btn}
                onClick={onDeleteMonth.bind(null, month.id!)}
              >
                Delete
              </button>
            </div>
          </Card>
        ))}
      </GridContainer>
    </>
  );
};

export default MonthsList;
