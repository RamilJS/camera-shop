
import { useAppSelector } from '../../hooks';
import { getSelectedProductStatus } from '../../store/cameras-data/selectors';
import Loader from '../loader/loader';
import { Camera } from '../../types/camera';
import { Status } from '../../const';
import Rating from '../rating/rating';

type ProductItemProps = {
  selectedProduct: Camera;
}

function ProductItem({selectedProduct}: ProductItemProps): JSX.Element {

  const loadingStatus = useAppSelector(getSelectedProductStatus);

  if (loadingStatus === Status.Pending) {
    return <Loader />;
  }

  if (loadingStatus === Status.Error) {
    return <p>Error loading product</p>;
  }

  return (
    <section className="product">
      <div className="container">
        <div className="product__img">
          <picture>
            <source
              type="image/webp"
              srcSet={`${selectedProduct?.previewImgWebp}, ${selectedProduct?.previewImgWebp2x} 2x`}
            />
            <img
              src={selectedProduct?.previewImg}
              srcSet={selectedProduct?.previewImg2x}
              width={560}
              height={480}
              alt={selectedProduct?.name}
            />
          </picture>
        </div>
        <div className="product__content">
          <h1 className="title title--h3">{selectedProduct?.name}</h1>
          <Rating
            rating={selectedProduct?.rating}
            id={selectedProduct?.id}
            reviewCount={selectedProduct?.reviewCount}
          />
          <p className="product__price">
            <span className="visually-hidden">Цена:</span>{selectedProduct?.price} ₽
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
                    <p className="item-list__text"> {selectedProduct?.vendorCode}</p>
                  </li>
                  <li className="item-list">
                    <span className="item-list__title">Категория:</span>
                    <p className="item-list__text">{selectedProduct?.category}</p>
                  </li>
                  <li className="item-list">
                    <span className="item-list__title">Тип камеры:</span>
                    <p className="item-list__text">{selectedProduct?.type}</p>
                  </li>
                  <li className="item-list">
                    <span className="item-list__title">Уровень:</span>
                    <p className="item-list__text">{selectedProduct?.level}</p>
                  </li>
                </ul>
              </div>
              <div className="tabs__element is-active">
                <div className="product__tabs-text">
                  <p>
                    {selectedProduct?.description}
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
