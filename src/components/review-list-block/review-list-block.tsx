import { useState } from 'react';
import { getReviews } from '../../store/reviews-data/selectors';
import { useAppSelector } from '../../hooks';
import ReviewCard from '../review-card/review-card';
import { DEFAULT_REVIEWS_COUNT, REVIEWS_TO_RENDER_COUNT } from '../../const';

function ReviewListBlock(): JSX.Element {
  const [renderedReviewsCount, setRenderedReviewsCount] = useState(DEFAULT_REVIEWS_COUNT);
  const reviewsList = useAppSelector(getReviews);

  return (
    <section className="review-block">
      <div className="container">
        <div className="page-content__headed">
          <h2 className="title title--h3">Отзывы</h2>
          <button className="btn" type="button">
            Оставить свой отзыв
          </button>
        </div>
        <ul className="review-block__list">
          {reviewsList.slice(0, renderedReviewsCount).map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </ul>
        <div className="review-block__buttons">
          <button className="btn btn--purple" type="button">
            Показать больше отзывов
          </button>
        </div>
      </div>
    </section>
  );
}

export default ReviewListBlock;
