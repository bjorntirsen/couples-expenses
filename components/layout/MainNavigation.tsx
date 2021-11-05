import React, { FC } from 'react';
import Link from 'next/link';
import classes from './MainNavigation.module.css';

interface Props {}

const MainNavigation: FC = (props: Props) => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>Couples Expenses</div>
      <nav>
        <ul>
          <li>
            <Link href='/'>Landing</Link>
          </li>
          <li>
            <Link href='/next'>Next.js</Link>
          </li>
          <li>
            <Link href='/expenses'>Expenses</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
