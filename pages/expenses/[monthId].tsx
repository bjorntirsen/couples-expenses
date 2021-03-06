import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { MongoClient, ObjectId } from 'mongodb';
import SectionWrapper from '../../components/UI/SectionWrapper';
import SectionTitle from '../../components/UI/SectionTitle';
import ExpensesForm from '../../components/expenses/ExpensesForm';
import { Month } from '../../components/month.model';

interface Props {
  monthData: Month;
}

const MonthDetailsPage: NextPage<Props> = ({ monthData }) => {
  const router = useRouter();
  const { monthId } = router.query;
  const updateMonthHandler = async (formData: Month) => {
    const response = await fetch(`/api/${monthId}`, {
      method: 'PUT',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    router.replace(`/expenses/${monthId}`);
    return data;
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
        <ExpensesForm
          onAddMonth={updateMonthHandler}
          updateable
          displayMonth={monthData}
        />
      </SectionWrapper>
    </>
  );
};

export async function getStaticPaths() {
  const client = await MongoClient.connect(process.env.DB_URI!);
  const db = client.db();
  const monthsCollection = db.collection('months');

  const months = await monthsCollection
    .find({}, { projection: { _id: 1 } })
    .toArray();

  client.close();

  return {
    fallback: 'blocking',
    paths: months.map((month) => ({
      params: { monthId: month._id.toString() },
    })),
  };
}

export async function getStaticProps(context: any) {
  //fetch one single month

  const monthId = context.params.monthId;
  const client = await MongoClient.connect(process.env.DB_URI!);
  const db = client.db();
  const monthsCollection = db.collection('months');

  const selectedMonth: any = await monthsCollection.findOne({
    _id: new ObjectId(monthId),
  });

  client.close();
  const {
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
  } = selectedMonth;

  return {
    props: {
      monthData: {
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
      },
    },
  };
}

export default MonthDetailsPage;
