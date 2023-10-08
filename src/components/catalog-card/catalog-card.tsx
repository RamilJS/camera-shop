import { Link } from 'react-router-dom';
import { Camera } from '../../types/camera';
//import { useAppSelector } from '../../hooks';
//import getBasket
import { AppRoute } from '../../const';

type CatalogCardProps = {
  camera: Camera;
  isActive: boolean;
}

function CatalogCard({camera, isActive}: CatalogCardProps): JSX.Element {
  //const dispatch = useAppDispatch();
  //const camerasInBasket = useAppSelector(getBasketCameras);

  const productCardClassName = isActive ? 'product-card is-active' : 'product-card';
  //const inCart = сamera.find((cartCamera) => сamera.id === camera.id);
  //const inBasket = camerasInBasket.find((cameraInBasket) => cameraInBasket.id === camera.id);
  const inBasket = false;

  return (
    <div className={productCardClassName}>
      <div className="product-card__img">
        <picture>
          <source
            type="image/webp"
            srcSet={`${camera.previewImgWebp}, ${camera.previewImg2x} 2x`}
          />
          <img
            src={camera.previewImg}
            srcSet={`${camera.previewImg2x} 2x`}
            width={280}
            height={240}
            alt={camera.name}
          />
        </picture>
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">
          <svg width={17} height={16} aria-hidden="true">
            <use xlinkHref="#icon-full-star" />
          </svg>
          <svg width={17} height={16} aria-hidden="true">
            <use xlinkHref="#icon-full-star" />
          </svg>
          <svg width={17} height={16} aria-hidden="true">
            <use xlinkHref="#icon-full-star" />
          </svg>
          <svg width={17} height={16} aria-hidden="true">
            <use xlinkHref="#icon-star" />
          </svg>
          <svg width={17} height={16} aria-hidden="true">
            <use xlinkHref="#icon-star" />
          </svg>
          <p className="visually-hidden">Рейтинг: {camera.rating}</p>
          <p className="rate__count">
            <span className="visually-hidden">Всего оценок:</span>
            {camera.reviewCount}
          </p>
        </div>
        <p className="product-card__title">
          {camera.name}
        </p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>{camera.price} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        {inBasket ?
          <Link
            className="btn btn--purple-border product-card__btn product-card__btn--in-cart"
            to="#"
          >
            <svg width={16} height={16} aria-hidden="true">
              <use xlinkHref="#icon-basket" />
            </svg>
            В корзине
          </Link>
          :
          <button
            className="btn btn--purple product-card__btn"
            type="button"
          >
            Купить
          </button>}
        <Link className="btn btn--transparent" to={`${AppRoute.Cameras}${camera.id}`}>
          Подробнее
        </Link>
      </div>
    </div>
  );
}

export default CatalogCard;
