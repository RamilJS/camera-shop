import {Link} from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { AppRoute } from '../../const';
import styles from './not-found-page.module.css';

function NotFoundPage(): JSX.Element {
  return (
    <>
      <Header/>
      <div className={`page ${styles.notFoundPage}`}>
        <Helmet>
          <title>Escape Room: 404</title>
        </Helmet>
        <h1 className={styles.title}>Error 404</h1>
        <br />
        <Link to={AppRoute.Main}>Go to main page</Link>
      </div>
      <Footer />
    </>
  );
}

export default NotFoundPage;
