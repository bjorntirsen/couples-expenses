import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import SectionWrapper from '../components/UI/SectionWrapper';
import SectionTitle from '../components/UI/SectionTitle';
import GridContainer from '../components/UI/GridContainer';
import CardLink from '../components/UI/CardLink';
import classes from './Next.module.css';

const Next: NextPage = () => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <SectionWrapper>
        <SectionTitle
          title='Welcome to Next.js!'
          subtitle='Get started by editing pages/index.tsx'
        />

        <GridContainer>
          <CardLink linkTo='https://nextjs.org/docs'>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </CardLink>

          <CardLink linkTo='https://nextjs.org/learn'>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </CardLink>

          <CardLink linkTo='https://github.com/vercel/next.js/tree/master/examples'>
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </CardLink>

          <CardLink linkTo='https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'>
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </CardLink>
        </GridContainer>

        <footer className={classes.footer}>
          <a
            href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
            target='_blank'
            rel='noopener noreferrer'
          >
            Powered by{' '}
            <span className={classes.logo}>
              <Image
                src='/vercel.svg'
                alt='Vercel Logo'
                width={72}
                height={16}
              />
            </span>
          </a>
        </footer>
      </SectionWrapper>
    </>
  );
};

export default Next;
