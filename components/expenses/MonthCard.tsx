import { FC, useState } from 'react';
import { Month } from '../month.model';
import classes from './MonthCard.module.css';

interface Props {
  month: Month;
  onDeleteMonth: (a: string) => any;
}

const MonthCard: FC<Props> = ({ month, onDeleteMonth }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async (monthId: string) => {
    setIsLoading(true);
    const response = await onDeleteMonth(monthId);
    console.log(response);
  };

  const setButtonTxt = () => {
    if (isLoading) return 'Deleting...';
    return 'Delete';
  };

  const buttonTxt = setButtonTxt();

  return (
    <div className={classes.card}>
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
          onClick={handleDelete.bind(null, month.id!)}
        >
          {buttonTxt}
        </button>
      </div>
    </div>
  );
};

export default MonthCard;
