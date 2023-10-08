import { useAppSelector } from '../../hooks';
import Loader from '../loader/loader';
import { Camera } from '../../types/camera';
import { getSelectedProductStatus } from '../../store/product-data/selectors';
import { Status } from '../../const';

type ProductItemProps = {
  product: Camera | null;
}

function ProductItem({product}: ProductItemProps): JSX.Element {
  //const loadingStatus = useAppSelector(getSelectedProductStatus);
  //console.log(loadingStatus);
/*
  if (loadingStatus === Status.Pending) {
    return <Loader />;
  }

  if (loadingStatus === Status.Error) {
    return <p>Error loading product</p>;
  }*/

  return (
    <section className="product">
      <div className="container">
        <div className="product__img">
          <picture>
            <source
              type="image/webp"
              srcSet={`${product.previewImgWebp}, ${product.previewImgWebp2x} 2x`}
            />
            <img
              src={`${product.previewImg}`}
              srcSet={`${product.previewImg2x} 2x`}
              width={560}
              height={480}
              alt={`${product.name}`}
            />
          </picture>
        </div>
        <div className="product__content">
          <h1 className="title title--h3">{product.name}</h1>
          <div className="rate product__rate">
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
              <use xlinkHref="#icon-full-star" />
            </svg>
            <svg width={17} height={16} aria-hidden="true">
              <use xlinkHref="#icon-star" />
            </svg>
            <p className="visually-hidden">Рейтинг: 4</p>
            <p className="rate__count">
              <span className="visually-hidden">Всего оценок:</span>12
            </p>
          </div>
          <p className="product__price">
            <span className="visually-hidden">Цена:</span>{product.price} ₽
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
                    <p className="item-list__text"> {product.vendorCode}</p>
                  </li>
                  <li className="item-list">
                    <span className="item-list__title">Категория:</span>
                    <p className="item-list__text">{product.category}</p>
                  </li>
                  <li className="item-list">
                    <span className="item-list__title">Тип камеры:</span>
                    <p className="item-list__text">{product.type}</p>
                  </li>
                  <li className="item-list">
                    <span className="item-list__title">Уровень:</span>
                    <p className="item-list__text">{product.level}</p>
                  </li>
                </ul>
              </div>
              <div className="tabs__element is-active">
                <div className="product__tabs-text">
                  <p>
                    {product.description}
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
