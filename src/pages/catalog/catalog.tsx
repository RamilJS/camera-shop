import { Link, useSearchParams } from 'react-router-dom';
//import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useAppSelector } from '../../hooks';
//import { useAppDispatch } from '../../hooks';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import Banner from '../../components/banner/banner';
import CatalogFilter from '../../components/catalog-filter/catalog-filter';
import CatalogSort from '../../components/catalog-sort/catalog-sort';
import Pagination from '../../components/pagination/pagination';
import CatalogCardList from '../../components/catalog-card-list/catalog-card-list';
//import { store } from '../../store';
import { getPromo } from '../../store/cameras-data/selectors';
//import { fetchPromoAction } from '../../store/api-actions';
//import { fetchCamerasAction } from '../../store/api-actions';
import { getCameras } from '../../store/cameras-data/selectors';
import { AppRoute, ITEMS_PER_PAGE, CATALOG_PAGE_COUNT } from '../../const';

import CatalogPopup from '../../components/catalog-popups/catalog-popup/catalog-popup';


function Catalog(): JSX.Element {
  //const dispatch = useAppDispatch;
  const cameras = useAppSelector(getCameras);
  const promoCamera = useAppSelector(getPromo);

  /*useEffect(() => {
    store.dispatch(fetchPromoAction());
    store.dispatch(fetchCamerasAction());
  }, [dispatch]);*/

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

  const showPrevButton = currentPage > 1;
  const showNextButton = currentPage < pageCount;

  const pageNumbers = [];
  let startPage = Math.max(1, currentPage - 1);
  const endPage = Math.min(pageCount, startPage + CATALOG_PAGE_COUNT - 1);

  if (endPage - startPage < CATALOG_PAGE_COUNT - 1) {
    startPage = Math.max(1, endPage - CATALOG_PAGE_COUNT + 1);
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
            <section className="catalog">
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
