import { Link } from 'react-router-dom';
import { Camera } from '../../types/camera';
import { setCameraInBasketModal } from '../../store/cameras-data/cameras-data';
import Rating from '../rating/rating';
import { useAppDispatch } from '../../hooks';

import { AppRoute } from '../../const';

type CatalogCardProps = {
  camera: Camera;
  isActive: boolean;
}

function CatalogCard({camera, isActive}: CatalogCardProps): JSX.Element {
  const dispatch = useAppDispatch();
  //const camerasInBasket = useAppSelector(getBasketCameras);

  const productCardClassName = isActive ? 'product-card is-active' : 'product-card';
  //const inBasket = camerasInBasket.find((cameraInBasket) => cameraInBasket.id === camera.id);
  const inBasket = false;

  const hadleBuyClick = () => dispatch(setCameraInBasketModal(camera));

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
        <Rating
          rating={camera.rating}
          id={camera.id}
          reviewCount={camera.reviewCount}
        />
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
            to={AppRoute.Basket}
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
            onClick={hadleBuyClick}
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
