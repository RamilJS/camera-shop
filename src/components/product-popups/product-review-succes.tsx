type ProductReviewSuccesProps = {
  handleModalClose: () => void;
}

function ProductReviewSucces({handleModalClose}: ProductReviewSuccesProps): JSX.Element {
  return (
    <div className="modal__content">
      <p className="title title--h4">Спасибо за отзыв</p>
      <svg className="modal__icon" width={80} height={78} aria-hidden="true">
        <use xlinkHref="#icon-review-success" />
      </svg>
      <div className="modal__buttons">
        <button
          onClick={handleModalClose}
          className="btn btn--purple modal__btn modal__btn--fit-width"
          type="button"
          autoFocus
        >
          Вернуться к покупкам
        </button>
      </div>
      <button
        onClick={handleModalClose}
        className="cross-btn"
        type="button"
        aria-label="Закрыть попап"
      >
        <svg width={10} height={10} aria-hidden="true">
          <use xlinkHref="#icon-close" />
        </svg>
      </button>
    </div>
  );
}

export default ProductReviewSucces;
