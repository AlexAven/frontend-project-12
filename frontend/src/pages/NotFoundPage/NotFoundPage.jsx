import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import styles from './NotFoundPage.module.scss';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.noPage}>
      <img className={styles.noPage__picture} src="./src/assets/nopage.png" alt="no-such-page" />
      <h1 className="noPage__title">{t('notFoundPage.title')}</h1>
      <p className="noPage__redirect">
        {t('notFoundPage.description')} <Link to={'/'}>{t('notFoundPage.link')}</Link>
      </p>
    </div>
  );
};

export default NotFoundPage;
