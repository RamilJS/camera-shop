
type RatingProps = {
  rating: number;
  id: number;
  reviewCount: number;
}

const MAX_RATING = 5;

function Rating({rating, id, reviewCount}: RatingProps) {
  const ratings = [];

  for (let i = 0; i < MAX_RATING; i++) {
    ratings.push(i);
  }

  return (
    <div className="rate product__rate">
      {ratings.map((rate) => (
        <svg width="17" height="16" aria-hidden="true" key={`${id}-${rate}`}>
          <use xlinkHref={rate < rating ? '#icon-full-star' : '#icon-star'}></use>
        </svg>
      ))}
      <p className="visually-hidden">Рейтинг: {rating}</p>
      <p className="rate__count">
        <span className="visually-hidden">Всего оценок:</span>
        {reviewCount}
      </p>
    </div>
  );
}

export default Rating;
