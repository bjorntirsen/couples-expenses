import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Couples Expenses</title>
        <meta
          name='description'
          content='Web app for couples to split their common expenses at the end of the month'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
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
      </main>

      <footer className={styles.footer}>
        <a
          href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src='/vercel.svg' alt='Vercel Logo' width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
