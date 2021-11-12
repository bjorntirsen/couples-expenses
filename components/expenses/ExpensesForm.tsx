import { FC, FormEvent, useRef, useState, useEffect, useCallback } from 'react';
import { Month } from '../month.model';
import classes from './ExpensesForm.module.css';

interface Props {
  onAddMonth: (a: Month) => void;
  updateable?: boolean;
  displayMonth?: Month;
}

const today = new Date();
const todayString = today.toISOString();
const monthString = todayString.substring(0, 7);

const ExpensesForm: FC<Props> = ({
  onAddMonth,
  updateable = false,
  displayMonth = {
    month: monthString,
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
  const [p1incPercent, setP1incPercent] = useState(0);
  const [p2incPercent, setP2incPercent] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);
  const [p1shouldBe, setP1shouldBe] = useState(0);
  const [p2shouldBe, setP2shouldBe] = useState(0);
  const [p1balance, setP1balance] = useState(0);
  const [p2balance, setP2balance] = useState(0);

  const updateCalculations = useCallback(() => {
    const p1income = +p1incomeInputRef.current!.value;
    const p2income = +p2incomeInputRef.current!.value;
    const p1spent = +p1spentInputRef.current!.value;
    const p2spent = +p2spentInputRef.current!.value;
    if (p1income > 0 || p2income > 0) setTotalIncome(p1income + p2income);
    if (p1spent > 0 || p2spent > 0) setTotalSpent(p1spent + p2spent);
    if (totalIncome > 0) {
      setP1incPercent(+((p1income / totalIncome) * 100).toFixed(2));
      setP2incPercent(+((p2income / totalIncome) * 100).toFixed(2));
    }
    if (totalSpent > 0) {
      setP1shouldBe(+((totalSpent * p1incPercent) / 100).toFixed(0));
      setP2shouldBe(+((totalSpent * p2incPercent) / 100).toFixed(0));
      setP1balance(p1spent - p1shouldBe);
      setP2balance(p2spent - p2shouldBe);
    }
  }, [
    totalIncome,
    p1incPercent,
    p2incPercent,
    totalSpent,
    p1shouldBe,
    p2shouldBe,
  ]);

  useEffect(() => {
    updateCalculations();
  }, [updateCalculations]);

  const handleOnChange = (event: FormEvent) => {
    // Update formData
    const eventTarget = event.target as HTMLInputElement;
    const formData: any = { ...formFields };
    eventTarget.type === 'number'
      ? (formData[eventTarget.id] = +eventTarget.value)
      : (formData[eventTarget.id] = eventTarget.value);
    setFormFields(formData);
    updateCalculations();
  };

  const monthSubmitHandler = (event: FormEvent) => {
    event.preventDefault();
    onAddMonth(formFields);
  };

  return (
    <form
      onChange={handleOnChange}
      onSubmit={monthSubmitHandler}
      className={classes.form_container}
    >
      <table className={classes.table}>
        <thead>
          <tr>
            <td colSpan={3} className={classes.text_center}>
              <label htmlFor='month'>Month: </label>
              <input
                className={classes.month_input}
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
            <th colSpan={3}>INCOME</th>
          </tr>
          <tr>
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
            <td>{p1incPercent}%</td>
            <td></td>
            <td>{p2incPercent}%</td>
          </tr>
          <tr>
            <th colSpan={3}>EXPENSES</th>
          </tr>
          <tr>
            <td colSpan={3}>Has spent</td>
          </tr>
          <tr>
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
            <td colSpan={3}>Should be</td>
          </tr>
          <tr>
            <td>{p1shouldBe}</td>
            <td></td>
            <td>{p2shouldBe}</td>
          </tr>
          <tr>
            <td colSpan={3}>Balance</td>
          </tr>
          <tr>
            <td>{p1balance}</td>
            <td></td>
            <td>{p2balance}</td>
          </tr>
        </tbody>
      </table>
      <div className={classes.centered}>
        <button className={classes.btn} type='submit'>
          {updateable ? 'Save changes to DB' : 'Save to DB'}
        </button>
      </div>
    </form>
  );
};

export default ExpensesForm;
