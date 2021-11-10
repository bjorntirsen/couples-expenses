import type { NextPage } from 'next';
import { useState } from 'react';
import Head from 'next/head';
import SectionWrapper from '../../components/UI/SectionWrapper';
import SectionTitle from '../../components/UI/SectionTitle';
import ExpensesForm from '../../components/expenses/ExpensesForm';
import { Month } from '../../components/month.model';

const MonthDetailsPage: NextPage = () => {
  const [months, setMonths] = useState<Month[]>([]);

  const monthAddHandler = (formData: Month) => {
    formData.id = Math.random().toString();
    setMonths((prevMonths) => [...prevMonths, formData]);
    console.log(months);
  };

  return (
    <>
      <Head>
        <title>Couples Expenses - Details</title>
        <meta
          name='description'
          content='Enter your common expenses at the end of the month'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <SectionWrapper>
        <SectionTitle
          title='This is the Details page'
          subtitle='Edit your past expenses here:'
        />
        <ExpensesForm onAddMonth={monthAddHandler} />
      </SectionWrapper>
    </>
  );
};

export default MonthDetailsPage;
