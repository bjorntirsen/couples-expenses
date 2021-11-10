import type { NextPage } from 'next';
import { useState } from 'react';
import Head from 'next/head';
import { MongoClient } from 'mongodb';
import SectionWrapper from '../components/UI/SectionWrapper';
import SectionTitle from '../components/UI/SectionTitle';
import ExpensesForm from '../components/expenses/ExpensesForm';
import { Month } from '../components/month.model';
import MonthsList from '../components/expenses/MonthsList';

interface Props {
  months: Month[];
}

const ExpensesPage: NextPage<Props> = ({ months }) => {
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

export async function getStaticProps() {
  const client = await MongoClient.connect(process.env.DB_URI!);
  const db = client.db();
  const monthsCollection = db.collection('months');

  const months = await monthsCollection.find().toArray();
  console.log(months);
  client.close();

  return {
    props: {
      months: months.map(
        ({
          month,
          person1,
          person2,
          p1income,
          p2income,
          p1spent,
          p2spent,
          p1hasPaid,
          p2hasPaid,
          locked,
        }) => ({
          month,
          person1,
          person2,
          p1income,
          p2income,
          p1spent,
          p2spent,
          p1hasPaid,
          p2hasPaid,
          locked,
          id: 'temp',
        })
      ),
    },
    revalidate: 10,
  };
}

export default ExpensesPage;
