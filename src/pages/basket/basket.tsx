import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import BasketList from '../../components/basket-list/basket-list';
import BasketSummaryOrder from '../../components/basket-summary/basket-summary-order';
import BasketPromo from '../../components/basket-summary/basket-promo';
import { AppRoute } from '../../const';

function Basket(): JSX.Element {
  return (
    <>
      <Helmet>
        <title>
        Корзина - Фотошоп
        </title>
      </Helmet>
      <div className="wrapper">
        <Header />
        <main>
          <div className="page-content">
            <div className="breadcrumbs">
              <div className="container">
                <ul className="breadcrumbs__list">
                  <li className="breadcrumbs__item">
                    <Link className="breadcrumbs__link" to={AppRoute.Main}>
                      Главная
                      <svg width={5} height={8} aria-hidden="true">
                        <use xlinkHref="#icon-arrow-mini" />
                      </svg>
                    </Link>
                  </li>
                  <li className="breadcrumbs__item">
                    <Link className="breadcrumbs__link" to={AppRoute.Main}>
                      Каталог
                      <svg width={5} height={8} aria-hidden="true">
                        <use xlinkHref="#icon-arrow-mini" />
                      </svg>
                    </Link>
                  </li>
                  <li className="breadcrumbs__item">
                    <span className="breadcrumbs__link breadcrumbs__link--active">
                      Корзина
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <section className="basket" data-testid="basket-section">
              <div className="container">
                <h1 className="title title--h2" data-testid="basket-title">Корзина</h1>
                <BasketList />
                <div className="basket__summary">
                  <BasketPromo/>
                  <BasketSummaryOrder/>
                </div>
              </div>
            </section>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default Basket;
