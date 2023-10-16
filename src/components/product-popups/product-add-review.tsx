import ReactModal from 'react-modal';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getPostReviewSuccesStatus, getAddRevieModalOpenStatus } from '../../store/reviews-data/selectors';
import { setAddReviewModalOpen, setPostReviewSuccessStatus } from '../../store/reviews-data/reviews-data';
import ReviewForm from '../review-form/review-form';
import ProductReviewSucces from './product-review-succes';

function ProductAddReview(): JSX.Element {
  const isModalOpen = useAppSelector(getAddRevieModalOpenStatus);
  const isAddReviewSuccess = useAppSelector(getPostReviewSuccesStatus);
  const dispatch = useAppDispatch();

  const handleModalClose = () => {
    dispatch(setAddReviewModalOpen(false));
    dispatch(setPostReviewSuccessStatus(false));
  };

  return (
    <ReactModal
      isOpen={isModalOpen}
      ariaHideApp={false}
      style={{content: {inset: 'unset'}}}
      bodyOpenClassName='scroll-lock'
      overlayClassName='custom-modal-overlay'
      onRequestClose={handleModalClose}
    >
      <div className="modal is-active">
        <div className="modal__wrapper">
          <div
            className="modal__overlay"
            onClick={handleModalClose}
          />
          {
            isAddReviewSuccess
              ?
              <ProductReviewSucces handleModalClose={handleModalClose} />
              :
              <div className="modal__content">
                <p className="title title--h4">Оставить отзыв</p>
                <div className="form-review">
                  <ReviewForm/>
                </div>
                <button
                  className="cross-btn"
                  type="button"
                  aria-label="Закрыть попап"
                  onClick={handleModalClose}
                >
                  <svg width={10} height={10} aria-hidden="true">
                    <use xlinkHref="#icon-close" />
                  </svg>
                </button>
              </div>
          }
        </div>
      </div>
    </ReactModal>
  );
}

export default ProductAddReview;
