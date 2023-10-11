
import { useAppSelector } from '../../hooks';
import { getCameraProductStatus } from '../../store/cameras-data/selectors';
import Loader from '../loader/loader';
import Rating from '../rating/rating';
import { Camera } from '../../types/camera';
import { formatPrice } from '../../utils';

type ProductItemProps = {
  camera: Camera;
}

function ProductItem({camera}: ProductItemProps): JSX.Element {
  const isCameraLoading = useAppSelector(getCameraProductStatus);

  if (isCameraLoading || !camera) {
    return <Loader />;
  }

  return (
    <section className="product">
      <div className="container">
        <div className="product__img">
          <picture>
            <source
              type="image/webp"
              srcSet={`/${camera.previewImgWebp}, /${camera.previewImgWebp2x} 2x`}
            />
            <img
              src={`/${camera.previewImg}`}
              srcSet={`/${camera.previewImg2x}`}
              width={560}
              height={480}
              alt={camera.name}
            />
          </picture>
        </div>
        <div className="product__content">
          <h1 className="title title--h3">{camera.name}</h1>
          <Rating
            rating={camera.rating}
            id={camera.id}
            reviewCount={camera.reviewCount}
          />
          <p className="product__price">
            <span className="visually-hidden">Цена:</span>{formatPrice(camera.price)}
          </p>
          <button className="btn btn--purple" type="button">
            <svg width={24} height={16} aria-hidden="true">
              <use xlinkHref="#icon-add-basket" />
            </svg>
            Добавить в корзину
          </button>
          <div className="tabs product__tabs">
            <div className="tabs__controls product__tabs-controls">
              <button className="tabs__control" type="button">
                Характеристики
              </button>
              <button className="tabs__control is-active" type="button">
                Описание
              </button>
            </div>
            <div className="tabs__content">
              <div className="tabs__element">
                <ul className="product__tabs-list">
                  <li className="item-list">
                    <span className="item-list__title">Артикул:</span>
                    <p className="item-list__text"> {camera.vendorCode}</p>
                  </li>
                  <li className="item-list">
                    <span className="item-list__title">Категория:</span>
                    <p className="item-list__text">{camera.category}</p>
                  </li>
                  <li className="item-list">
                    <span className="item-list__title">Тип камеры:</span>
                    <p className="item-list__text">{camera.type}</p>
                  </li>
                  <li className="item-list">
                    <span className="item-list__title">Уровень:</span>
                    <p className="item-list__text">{camera.level}</p>
                  </li>
                </ul>
              </div>
              <div className="tabs__element is-active">
                <div className="product__tabs-text">
                  <p>
                    {camera.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductItem;
