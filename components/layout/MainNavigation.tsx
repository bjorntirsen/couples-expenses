import React, { FC, useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/client';

import classes from './MainNavigation.module.css';

interface Props {}

const MainNavigation: FC = (props: Props) => {
  const [session, loading] = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const logoutHandler = () => {
    setIsLoading(true);
    signOut();
  };

  return (
    <header className={classes.header}>
      <div className={classes.logo_container}>
        <Link href='/'>
          <a>
            <span className={classes.logo}>Couples Expenses</span>
          </a>
        </Link>
      </div>
      <nav>
        <ul>
          {!session && !loading && (
            <li>
              <Link href='/auth'>Login</Link>
            </li>
          )}
          {session && (
            <>
              <li>
                <Link href='/expenses'>Expenses</Link>
              </li>
              <li>
                <span className={classes.username}>
                  Logged in as: {session.user.name}
                </span>
              </li>
              <li>
                <button onClick={logoutHandler}>
                  {isLoading ? 'Logging out...' : 'Logout'}
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
