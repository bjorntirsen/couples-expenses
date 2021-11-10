import { FC, FormEvent, useRef, useState } from 'react';
import { Month } from '../month.model';
import classes from './ExpensesForm.module.css';

interface Props {
  onAddMonth: (a: Month) => void;
  displayMonth?: Month;
}

const ExpensesForm: FC<Props> = ({
  onAddMonth,
  displayMonth = {
    month: '2021-11',
    person1: 'person 1',
    person2: 'person 2',
    p1income: 0,
    p2income: 0,
    p1spent: 0,
    p2spent: 0,
    p1hasPaid: 0,
    p2hasPaid: 0,
    locked: false,
  },
}) => {
  const [formFields, setFormFields] = useState<Month>(displayMonth);
  const monthInputRef = useRef<HTMLInputElement>(null);
  const person1InputRef = useRef<HTMLInputElement>(null);
  const person2InputRef = useRef<HTMLInputElement>(null);
  const p1incomeInputRef = useRef<HTMLInputElement>(null);
  const p2incomeInputRef = useRef<HTMLInputElement>(null);
  const p1spentInputRef = useRef<HTMLInputElement>(null);
  const p2spentInputRef = useRef<HTMLInputElement>(null);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);

  const handleOnChange = (event: FormEvent) => {
    // Update formData
    const eventTarget = event.target as HTMLInputElement;
    const formData: any = { ...formFields };
    console.log(eventTarget.id, typeof eventTarget.value);
    eventTarget.type === 'number'
      ? (formData[eventTarget.id] = +eventTarget.value)
      : (formData[eventTarget.id] = eventTarget.value);
    setFormFields(formData);
    // Update calculations
    const p1income = +p1incomeInputRef.current!.value;
    const p2income = +p2incomeInputRef.current!.value;
    const p1spent = +p1spentInputRef.current!.value;
    const p2spent = +p2spentInputRef.current!.value;
    if (p1income > 0 || p2income > 0) setTotalIncome(p1income + p2income);
    if (p1spent > 0 || p2spent > 0) setTotalSpent(p1spent + p2spent);
  };

  const monthSubmitHandler = (event: FormEvent) => {
    event.preventDefault();
    onAddMonth(formFields);
    console.log('submit');
  };

  return (
    <form
      onChange={handleOnChange}
      onSubmit={monthSubmitHandler}
      className={classes.form_container}
    >
      <table>
        <thead>
          <tr>
            <td colSpan={4} className={classes.text_center}>
              <label htmlFor='month'>Month: </label>
              <input
                type='month'
                id='month'
                min='2018-03'
                defaultValue={displayMonth.month}
                ref={monthInputRef}
              />
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th colSpan={4}>INCOME</th>
          </tr>
          <tr>
            <td></td>
            <td>
              <input
                type='text'
                defaultValue={displayMonth.person1}
                aria-labelledby='person1'
                id='person1'
                ref={person1InputRef}
              />
            </td>
            <td>TOTAL:</td>
            <td>
              <input
                type='text'
                defaultValue={displayMonth.person2}
                aria-labelledby='person2'
                id='person2'
                ref={person2InputRef}
              />
            </td>
          </tr>
          <tr>
            <td>Amount</td>
            <td>
              <input
                type='number'
                ref={p1incomeInputRef}
                min={0}
                id='p1income'
                defaultValue={displayMonth.p1income}
              />
            </td>
            <td>{totalIncome}</td>
            <td>
              <input
                type='number'
                ref={p2incomeInputRef}
                min={0}
                id='p2income'
                defaultValue={displayMonth.p2income}
              />
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
              <input
                type='number'
                ref={p1spentInputRef}
                min={0}
                id='p1spent'
                defaultValue={displayMonth.p1spent}
              />
            </td>
            <td>{totalSpent}</td>
            <td>
              <input
                type='number'
                ref={p2spentInputRef}
                min={0}
                id='p2spent'
                defaultValue={displayMonth.p2spent}
              />
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
        </tbody>
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
