import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import CardLink from '../components/UI/CardLink';
import GridContainer from '../components/UI/GridContainer';
import styles from './Landing.module.css';

const Landing: NextPage = () => {
  return (
    <section className={styles.container}>
      <Head>
        <title>Couples Expenses</title>
        <meta
          name='description'
          content='Web app for couples to split their common expenses at the end of the month'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className={styles.main}>
        <h1 className={styles.title}>Welcome to Couples Expenses!</h1>

        <p className={styles.description}>
          Get started by following one of the following links:
        </p>

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
      </div>
    </section>
  );
};

export default Landing;
