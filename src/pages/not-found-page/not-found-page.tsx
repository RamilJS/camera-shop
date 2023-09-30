import {Link} from 'react-router-dom';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { AppRoute } from '../../const';

function NotFoundPage(): JSX.Element {
  return (
    <>
      <Header/>
      <div className="page">
        <h1>Error 404.
          <br />
          <small>Page not found</small>
        </h1>
        <Link to={AppRoute.Main}>Go to main page</Link>
      </div>
      <Footer />
    </>
  );
}

export default NotFoundPage;
