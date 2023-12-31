import { Link, generatePath } from 'react-router-dom';
import { Camera } from '../../types/camera';
import { setCameraInBasketModal } from '../../store/cameras-data/cameras-data';
import Rating from '../rating/rating';
import { useAppDispatch } from '../../hooks';
import { formatPrice } from '../../utils';
import { AppRoute } from '../../const';

type CatalogCardProps = {
  camera: Camera;
  productClassName: string;
}

function CatalogCard({camera, productClassName }: CatalogCardProps): JSX.Element {
  const dispatch = useAppDispatch();
  const inBasket = false;

  const handleBuyClick = () => dispatch(setCameraInBasketModal(camera));

  return (
    <div className={productClassName} data-testid="camera-card-test">
      <div className="product-card__img">
        <picture>
          <source
            type="image/webp"
            srcSet={`/${camera.previewImgWebp}, /${camera.previewImg2x} 2x`}
          />
          <img
            src={`/${camera.previewImg}`}
            srcSet={`/${camera.previewImg2x} 2x`}
            width={280}
            height={240}
            alt={camera.name}
          />
        </picture>
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">
          <Rating rating={camera.rating} id={camera.id} />
          <p className="visually-hidden">Рейтинг: {camera.rating}</p>
          <p className="rate__count">
            <span className="visually-hidden">Всего оценок:</span>{camera.reviewCount}
          </p>
        </div>
        <p className="product-card__title">
          {camera.name}
        </p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>{formatPrice(camera.price)}
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
            onClick={handleBuyClick}
          >
            Купить
          </button>}
        <Link
          className="btn btn--transparent"
          to={generatePath(AppRoute.Product, {
            id: String(camera.id),
            tab: AppRoute.DescriptionTab
          })}
        >
          Подробнее
        </Link>
      </div>
    </div>
  );
}

export default CatalogCard;
