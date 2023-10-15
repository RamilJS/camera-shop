import { useState, useEffect } from 'react';
import { getReviews } from '../../store/reviews-data/selectors';
import { useAppSelector } from '../../hooks';
//import { useAppDispatch } from '../../hooks';
import ReviewCard from '../review-card/review-card';
import { Reviews } from '../../types/reviews';
import { DEFAULT_REVIEWS_COUNT, REVIEWS_TO_RENDER_COUNT } from '../../const';

const isEndOfPage = () => window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight;
const isAllReviewsRendered = (renderedReviewsCount: number, reviews: Reviews) => renderedReviewsCount >= reviews.length;

function ReviewListBlock(): JSX.Element {
  //const dispatch = useAppDispatch();
  const [renderedReviewsCount, setRenderedReviewsCount] = useState(DEFAULT_REVIEWS_COUNT);
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const reviewsList = useAppSelector(getReviews);

  const handleScroll = () => {
    if (isEndOfPage()) {
      setHasScrolledToBottom(true);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    if (isAllReviewsRendered(renderedReviewsCount, reviewsList)) {
      window.removeEventListener('scroll', handleScroll);
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, [renderedReviewsCount, reviewsList]);

  useEffect(() => {
    let isMounted = true;

    if (isMounted && hasScrolledToBottom && !isAllReviewsRendered(renderedReviewsCount, reviewsList)) {
      setRenderedReviewsCount(renderedReviewsCount + REVIEWS_TO_RENDER_COUNT);
      setHasScrolledToBottom(false);
    }

    return () => {
      isMounted = false;
    };

  }, [hasScrolledToBottom, renderedReviewsCount, reviewsList]);

  const handleShowMoreReviewsClick = () => {
    setRenderedReviewsCount(renderedReviewsCount + REVIEWS_TO_RENDER_COUNT);
  };

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
          {
            isAllReviewsRendered(renderedReviewsCount, reviewsList) ? null :
              <button
                onClick={handleShowMoreReviewsClick}
                className="btn btn--purple"
                type="button"
              >
                Показать больше отзывов
              </button>
          }
        </div>
      </div>
    </section>
  );
}

export default ReviewListBlock;
