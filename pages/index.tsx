import type { NextPage } from 'next';
import Head from 'next/head';
import CardLink from '../components/UI/CardLink';
import GridContainer from '../components/UI/GridContainer';
import SectionTitle from '../components/UI/SectionTitle';
import SectionWrapper from '../components/UI/SectionWrapper';

const Landing: NextPage = () => {
  return (
    <>
      <Head>
        <title>Couples Expenses</title>
        <meta
          name='description'
          content='Web app for couples to split their common expenses at the end of the month'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <SectionWrapper>
        <SectionTitle
          title='Welcome to Couples Expenses!'
          subtitle='Get started by following one of the following links:'
        />

        <GridContainer>
          <CardLink linkTo='/next'>
            <h2>Learn about Next.js &rarr;</h2>
            <p>The React.js framework.</p>
          </CardLink>

          <CardLink linkTo='/expenses'>
            <h2>Split your expenses &rarr;</h2>
            <p>Start using the app!</p>
          </CardLink>
        </GridContainer>
      </SectionWrapper>
    </>
  );
};

export default Landing;
