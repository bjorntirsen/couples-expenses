import type { NextPage } from 'next';
import { useState } from 'react';
import Head from 'next/head';
import SectionWrapper from '../components/UI/SectionWrapper';
import SectionTitle from '../components/UI/SectionTitle';
import ExpensesForm from '../components/expenses/ExpensesForm';
import { Month } from '../components/month.model';
import MonthsList from '../components/expenses/MonthsList';

const ExpensesPage: NextPage = () => {
  const [months, setMonths] = useState<Month[]>([]);

  const addMonthHandler = async (enteredMonthData: Month) => {
    const response = await fetch('/api/new-month', {
      method: 'POST',
      body: JSON.stringify(enteredMonthData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    console.log(data);
    // formData.id = Math.random().toString();
    // setMonths((prevMonths) => [...prevMonths, formData]);
    // console.log(months);
  };

  return (
    <>
      <Head>
        <title>Couples Expenses - Expenses</title>
        <meta
          name='description'
          content='Enter your common expenses at the end of the month'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <SectionWrapper>
        <SectionTitle
          title='This is the Expenses page'
          subtitle='Add your expenses here:'
        />
        <ExpensesForm onAddMonth={addMonthHandler} />
        <MonthsList items={months} />
      </SectionWrapper>
    </>
  );
};

export default ExpensesPage;
