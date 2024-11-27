import { Outlet } from 'react-router-dom';

import styles from './Layout.module.scss';
import Header from '../Header/Header';

const Layout = () => {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
