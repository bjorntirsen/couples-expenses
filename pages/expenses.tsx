import type { NextPage } from 'next';
import { useState } from 'react';
import Head from 'next/head';
import SectionWrapper from '../components/UI/SectionWrapper';
import SectionTitle from '../components/UI/SectionTitle';
import ExpensesForm from '../components/expenses/ExpensesForm';
import { Month } from '../components/month.model';

const ExpensesPage: NextPage = () => {
  const [months, setMonths] = useState<Month[]>([]);

  // interface MonthForm {
  //   month: Date;
  //   person1: string;
  //   person2: string;
  //   p1income: number;
  //   p2income: number;
  //   p1spent: number;
  //   p2spent: number;
  // }

  const monthAddHandler = () => {
    console.log('month added');
    // setMonths((prevMonths) => [
    //   ...prevMonths,
    //   { id: Math.random().toString(), locked: true, ...data },
    // ]);
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
        <ExpensesForm onAddMonth={monthAddHandler} />
      </SectionWrapper>
    </>
  );
};

export default ExpensesPage;
