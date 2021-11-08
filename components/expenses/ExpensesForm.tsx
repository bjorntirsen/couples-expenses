import React, { FC, FormEvent } from 'react';
import classes from './ExpensesForm.module.css';

interface Props {}

const ExpensesForm: FC<Props> = () => {
  const handleOnChange = () => {
    console.log('change');
  };

  const handleOnSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log('submit');
  };

  return (
    <form
      onChange={handleOnChange}
      onSubmit={handleOnSubmit}
      className={classes.form_container}
    >
      <table>
        <tr>
          <td colSpan={4} className={classes.text_center}>
            <label htmlFor='month'>Month: </label>
            <input type='month' id='month' min='2018-03' value='2021-11' />
          </td>
        </tr>
        <tr>
          <th colSpan={4}>INCOME</th>
        </tr>
        <tr>
          <th></th>
          <th>
            <input type='text' placeholder='person 1' />
          </th>
          <th>TOTAL</th>
          <th>
            <input type='text' placeholder='person 2' />
          </th>
        </tr>
        <tr>
          <td>Amount</td>
          <td>
            <input type='number' />
          </td>
          <td>calc</td>
          <td>
            <input type='number' />
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
            <input type='number' />
          </td>
          <td>calc</td>
          <td>
            <input type='number' />
          </td>
        </tr>
        <tr>
          <td>Amount</td>
          <td>
            <input type='number' />
          </td>
          <td>calc</td>
          <td>
            <input type='number' />
          </td>
        </tr>
        <tr>
          <td>%</td>
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
