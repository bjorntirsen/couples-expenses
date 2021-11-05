import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
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

        <div className={styles.grid}>
          <a href='/next' className={styles.card}>
            <h2>Learn about Next.js &rarr;</h2>
            <p>The React.js framework.</p>
          </a>

          <a href='/expenses' className={styles.card}>
            <h2>Split your expenses &rarr;</h2>
            <p>Start using the app!</p>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Landing;
