import { Link } from 'react-router-dom';

type CatalogAddSuccesProps = {
  handleLinkToBasketClick: () => void;
  handleModalClose: () => void;
}

function CatalogAddSucces({handleModalClose, handleLinkToBasketClick}: CatalogAddSuccesProps): JSX.Element {
  return (
    <div className="modal is-active modal--narrow">
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={handleModalClose}/>
        <div className="modal__content">
          <p className="title title--h4">Товар успешно добавлен в корзину</p>
          <svg className="modal__icon" width={86} height={80} aria-hidden="true">
            <use xlinkHref="#icon-success" />
          </svg>
          <div className="modal__buttons">
            <Link
              onClick={handleModalClose}
              className="btn btn--transparent modal__btn"
              to="#"
            >
              Продолжить покупки
            </Link>
            <button
              onClick={handleLinkToBasketClick}
              className="btn btn--purple modal__btn modal__btn--fit-width"
            >
              Перейти в корзину
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

export default CatalogAddSucces;
