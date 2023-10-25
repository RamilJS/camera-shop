import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import SimilarProduct from '../../components/similar-product/similar-product';
import ReviewListBlock from '../../components/review-list-block/review-list-block';
import ProductItem from '../../components/product-item/product-item';
import CatalogPopup from '../../components/catalog-popups/catalog-popup/catalog-popup';
import ProductAddReview from '../../components/product-popups/product-add-review';
import { fetchCameraAction } from '../../store/api-actions';
import { fetchSimilarCamerasAction } from '../../store/api-actions';
import { fetchReviewsAction } from '../../store/api-actions';
import { getCameraProduct } from '../../store/cameras-data/selectors';
import { AppRoute } from '../../const';
import UpButton from '../../components/up-button/up-button';


function Product(): JSX.Element {
  const camera = useAppSelector(getCameraProduct);
  const dispatch = useAppDispatch();

  const cameraId = Number(useParams().id);

  useEffect(() => {
    dispatch(fetchCameraAction(cameraId));
    dispatch(fetchSimilarCamerasAction(cameraId));
    dispatch(fetchReviewsAction(cameraId));
  },[cameraId, dispatch]);

  return (
    <>
      <Helmet>
        <title>Продукт - Фотошоп</title>
      </Helmet>
      <div className="wrapper">
        <Header/>
        <main>
          <div className="page-content" data-testid="product-test-container">
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
                      {camera?.name}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="page-content__section">
              <ProductItem camera={camera} />
            </div>
            <div className="page-content__section">
              <SimilarProduct/>
            </div>
            <div className="page-content__section">
              <ReviewListBlock />
            </div>
          </div>
        </main>
        <UpButton/>
        <Footer />
        <ProductAddReview/>
        <CatalogPopup/>
      </div>
    </>
  );
}

export default Product;
