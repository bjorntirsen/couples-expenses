import React, { FC } from 'react';
import Link from 'next/link';
import classes from './MainNavigation.module.css';

interface Props {}

const MainNavigation: FC = (props: Props) => {
  return (
    <header className={classes.header}>
      <div className={classes.logo_container}>
        {/* eslint-disable-next-line @next/next/link-passhref */}
        <Link href='/'>
          <span className={classes.logo}>Couples Expenses</span>
        </Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link href='/expenses'>Expenses</Link>
          </li>
          <li>
            <Link href='/next'>Next.js</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
