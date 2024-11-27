import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';

const NotFoundPage = () => {
  return (
    <div className={styles.noPage}>
      <img className={styles.noPage__picture} src="./src/assets/nopage.png" alt="no-such-page" />
      <h1 className="noPage__title">Ой, пусто :(</h1>
      <h2 className="noPage__description">Вероятно, такой страницы не существует</h2>
      <p className="noPage__redirect">
        Вы можете вернуться на главную страницу кликнув <Link to={'/'}>здесь</Link>
      </p>
    </div>
  );
};

export default NotFoundPage;
