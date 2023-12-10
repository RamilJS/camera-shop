import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { AppRoute } from '../../const';
import SearchForm from '../search-form/search-form';
import { getCamerasDataLoadingStatus } from '../../store/cameras-data/selectors';

function Header(): JSX.Element {
  const isCamerasLoading = useAppSelector(getCamerasDataLoadingStatus);

  return (
    <header className="header" id="header">
      <div className="container">
        <Link
          className="header__logo"
          to={AppRoute.Main}
          aria-label="Переход на главную"
        >
          <svg width={100} height={36} aria-hidden="true">
            <use xlinkHref="#icon-logo" />
          </svg>
        </Link>
        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item">
              <Link className="main-nav__link" to={AppRoute.Main}>
                Каталог
              </Link>
            </li>
            <li className="main-nav__item">
              <Link className="main-nav__link" to="#">
                Гарантии
              </Link>
            </li>
            <li className="main-nav__item">
              <Link className="main-nav__link" to="#">
                Доставка
              </Link>
            </li>
            <li className="main-nav__item">
              <Link className="main-nav__link" to="#">
                О компании
              </Link>
            </li>
          </ul>
        </nav>
        <SearchForm isCamerasLoading={isCamerasLoading}/>
        <Link className="header__basket-link" data-testid="basket-link" to={AppRoute.Basket}>
          <svg width={16} height={16} aria-hidden="true">
            <use xlinkHref="#icon-basket" />
          </svg>
          <span className="header__basket-count">3</span>
        </Link>
      </div>
    </header>
  );
}

export default Header;
