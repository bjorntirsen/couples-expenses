import { FC } from 'react';
import MainNavigation from './MainNavigation';
import classes from './Layout.module.css';

const Layout: FC = (props) => {
  return (
    <div className={classes.wrapper}>
      <MainNavigation />
      <main className={classes.main}>{props.children}</main>
    </div>
  );
};

export default Layout;
