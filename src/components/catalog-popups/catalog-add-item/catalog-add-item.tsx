import { Camera } from '../../../types/camera';


type CatalogAddItemProps = {
  camera: Camera;
  handleAddToBasketClick: () => void;
  handleModalClose: () => void;
}

function CatalogAddItem({camera, handleAddToBasketClick, handleModalClose}: CatalogAddItemProps): JSX.Element {

  return (
    <div className="modal is-active">
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={handleModalClose}/>
        <div className="modal__content">
          <p className="title title--h4">Добавить товар в корзину</p>
          <div className="basket-item basket-item--short">
            <div className="basket-item__img">
              <picture>
                <source
                  type="image/webp"
                  srcSet={`${camera?.previewImgWebp}, ${camera?.previewImgWebp2x} 2x`}
                />
                <img
                  src={camera?.previewImg}
                  srcSet={camera?.previewImg2x}
                  width={140}
                  height={120}
                  alt={camera?.name}
                />
              </picture>
            </div>
            <div className="basket-item__description">
              <p className="basket-item__title">{camera?.name}</p>
              <ul className="basket-item__list">
                <li className="basket-item__list-item">
                  <span className="basket-item__article">Артикул:</span>{' '}
                  <span className="basket-item__number">{camera?.vendorCode}</span>
                </li>
                <li className="basket-item__list-item">{camera?.type} {camera?.category}</li>
                <li className="basket-item__list-item">{camera?.level} уровень</li>
              </ul>
              <p className="basket-item__price">
                <span className="visually-hidden">Цена:</span>{camera?.price} ₽
              </p>
            </div>
          </div>
          <div className="modal__buttons">
            <button
              onClick={handleAddToBasketClick}
              className="btn btn--purple modal__btn modal__btn--fit-width"
              type="button"
            >
              <svg width={24} height={16} aria-hidden="true">
                <use xlinkHref="#icon-add-basket" />
              </svg>
              Добавить в корзину
            </button>
          </div>
          <button
            onClick={handleModalClose}
            className="cross-btn" type="button" aria-label="Закрыть попап"
          >
            <svg width={10} height={10} aria-hidden="true">
              <use xlinkHref="#icon-close" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default CatalogAddItem;
