import type { NextPage } from 'next';
import Head from 'next/head';
import SectionWrapper from '../components/UI/SectionWrapper';
import SectionTitle from '../components/UI/SectionTitle';
import ExpensesForm from '../components/expenses/ExpensesForm';

// const handleOnChange = (e: { target: { value: string } }) => {
//   console.log(e.target.value);
// };

const expensesPage: NextPage = () => {
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
        <ExpensesForm />
      </SectionWrapper>
    </>
  );
};

export default expensesPage;
