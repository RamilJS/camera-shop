import { Link, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';
import { store } from '../../store';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import Banner from '../../components/banner/banner';
import CatalogFilter from '../../components/catalog-filter/catalog-filter';
import CatalogSort from '../../components/catalog-sort/catalog-sort';
import Pagination from '../../components/pagination/pagination';
import CatalogCardList from '../../components/catalog-card-list/catalog-card-list';
import { getPromo } from '../../store/cameras-data/selectors';
import { getCameras } from '../../store/cameras-data/selectors';
import { fetchPromoAction } from '../../store/api-actions';
import { fetchCamerasAction } from '../../store/api-actions';
import { AppRoute, ITEMS_PER_PAGE, CATALOG_PAGE_COUNT } from '../../const';
import CatalogPopup from '../../components/catalog-popups/catalog-popup/catalog-popup';

function Catalog(): JSX.Element {

  const cameras = useAppSelector(getCameras);
  const promoCamera = useAppSelector(getPromo);

  const dispatch = useAppDispatch();

  useEffect(() => {
    store.dispatch(fetchPromoAction());
    store.dispatch(fetchCamerasAction());
  }, [dispatch]);

  const [searchParams, setSearchParams] = useSearchParams();

  const totalCount = cameras.length;
  const pageCount = Math.ceil(totalCount / ITEMS_PER_PAGE);

  let currentPage = parseInt(searchParams.get('page') || '1', 10);

  if (currentPage < 1) {
    currentPage = 1;
  } else if (currentPage > pageCount) {
    currentPage = pageCount;
  }

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalCount);

  let showPrevButton = false;
  const showNextButton = currentPage < pageCount && currentPage < 4;

  if(pageCount > 3) {
    showPrevButton = currentPage > 3;
  } else {
    showPrevButton = false;
  }

  const pageNumbers = [];
  let startPage;
  let endPage;

  if (currentPage <= 3) {
    startPage = 1;
    endPage = Math.min(pageCount, startPage + CATALOG_PAGE_COUNT - 1);
  } else if (currentPage === 4) {
    startPage = currentPage;
    endPage = Math.min(pageCount, startPage + CATALOG_PAGE_COUNT - 1);
  } else {
    startPage = Math.max(1, currentPage - 1);
    endPage = Math.min(pageCount, startPage + CATALOG_PAGE_COUNT - 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const handlePageChange = (pageNumber: number) => {
    setSearchParams({ page: pageNumber.toString() });
  };

  const visibleCameras = cameras.slice(startIndex, endIndex);

  return (
    <>
      <Helmet>
        <title>Каталог - Фотошоп</title>
      </Helmet>
      <div className="wrapper">
        <Header />
        <main>
          <Banner promoCamera={promoCamera}/>
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
                    <span className="breadcrumbs__link breadcrumbs__link--active">
                      Каталог
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <section className="catalog" data-testid="catalog-test-container">
              <div className="container">
                <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
                <div className="page-content__columns">
                  <div className="catalog__aside">
                    <CatalogFilter />
                  </div>
                  <div className="catalog__content">
                    <CatalogSort />
                    <CatalogCardList cameras={visibleCameras} />
                    <Pagination
                      showPrevButton={showPrevButton}
                      showNextButton={showNextButton}
                      currentPage={currentPage}
                      handlePageChange={handlePageChange}
                      pageNumbers={pageNumbers}
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
        <Footer />
        <CatalogPopup/>
      </div>
    </>
  );
}

export default Catalog;
