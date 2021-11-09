import { FC, FormEvent, useRef, useState } from 'react';
import classes from './ExpensesForm.module.css';

interface Props {
  onAddMonth: (a: string) => void;
}

const ExpensesForm: FC<Props> = ({ onAddMonth }) => {
  const monthInputRef = useRef<HTMLInputElement>(null);
  const person1InputRef = useRef<HTMLInputElement>(null);
  const person2InputRef = useRef<HTMLInputElement>(null);
  const p1incomeInputRef = useRef<HTMLInputElement>(null);
  const p2incomeInputRef = useRef<HTMLInputElement>(null);
  const p1spentInputRef = useRef<HTMLInputElement>(null);
  const p2spentInputRef = useRef<HTMLInputElement>(null);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);

  const handleOnChange = () => {
    if (
      +p1incomeInputRef.current!.value > 0 ||
      +p2incomeInputRef.current!.value > 0
    )
      setTotalIncome(
        +p1incomeInputRef.current!.value + +p2incomeInputRef.current!.value
      );
    if (
      +p1spentInputRef.current!.value > 0 ||
      +p2spentInputRef.current!.value > 0
    )
      setTotalSpent(
        +p1spentInputRef.current!.value + +p2spentInputRef.current!.value
      );
    console.log('change');
  };

  const monthSubmitHandler = (event: FormEvent) => {
    event.preventDefault();
    console.log('submit');
  };

  return (
    <form
      onChange={handleOnChange}
      onSubmit={monthSubmitHandler}
      className={classes.form_container}
    >
      <table>
        <tr>
          <td colSpan={4} className={classes.text_center}>
            <label htmlFor='month'>Month: </label>
            <input
              type='month'
              id='month'
              min='2018-03'
              value='2021-11'
              ref={monthInputRef}
            />
          </td>
        </tr>
        <tr>
          <th colSpan={4}>INCOME</th>
        </tr>
        <tr>
          <td></td>
          <td>
            <input
              type='text'
              placeholder='person 1'
              aria-labelledby='person1'
              ref={person1InputRef}
            />
          </td>
          <td>TOTAL:</td>
          <td>
            <input
              type='text'
              placeholder='person 2'
              aria-labelledby='person2'
              ref={person2InputRef}
            />
          </td>
        </tr>
        <tr>
          <td>Amount</td>
          <td>
            <input type='number' ref={p1incomeInputRef} min={0} />
          </td>
          <td>{totalIncome}</td>
          <td>
            <input type='number' ref={p2incomeInputRef} min={0} />
          </td>
        </tr>
        <tr>
          <td>%</td>
          <td>calc</td>
          <td></td>
          <td>calc</td>
        </tr>
        <tr>
          <th colSpan={4}>EXPENSES</th>
        </tr>
        <tr>
          <td>Has spent</td>
          <td>
            <input type='number' ref={p1spentInputRef} min={0} />
          </td>
          <td>{totalSpent}</td>
          <td>
            <input type='number' ref={p2spentInputRef} min={0} />
          </td>
        </tr>
        <tr>
          <td>Should be</td>
          <td>calc</td>
          <td>calc</td>
          <td>calc</td>
        </tr>
        <tr>
          <td>Balance</td>
          <td>calc</td>
          <td></td>
          <td>calc</td>
        </tr>
      </table>
      <div className={classes.centered}>
        <button className={classes.btn} type='submit'>
          Save to DB
        </button>
      </div>
    </form>
  );
};

export default ExpensesForm;
