import type { NextPage } from 'next';
import Head from 'next/head';
import router from 'next/router';
import { getSession } from 'next-auth/client';

import SectionWrapper from '../components/UI/SectionWrapper';
import SectionTitle from '../components/UI/SectionTitle';
import ExpensesForm from '../components/expenses/ExpensesForm';
import { Month } from '../components/month.model';
import MonthsList from '../components/expenses/MonthsList';
import { connectToDatabase } from '../lib/db';

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
    router.replace('/expenses');
    return data;
  };

  const deleteMonthHandler = async (monthId: string) => {
    const response = await fetch(`/api/${monthId}`, {
      method: 'DELETE',
    });

    const data = await response.json();
    router.replace('/expenses');
    return data;
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
        <MonthsList items={months} onDeleteMonth={deleteMonthHandler} />
      </SectionWrapper>
    </>
  );
};

export const getServerSideProps = async (context: any) => {
  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }

  const client = await connectToDatabase();
  const db = client.db();
  const monthsCollection = db.collection('months');
  const months = await monthsCollection.find().sort({ month: -1 }).toArray();
  client.close();
  
  return {
    props: {
      session,
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
          _id,
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
          id: _id.toString(),
        })
      ),
    },
  };
};

export default ExpensesPage;
