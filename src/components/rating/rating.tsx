
type RatingProps = {
  rating: number;
  id: number | string;
}

const MAX_RATING = 5;

function Rating({rating, id}: RatingProps) {
  const ratings = [];

  for (let i = 0; i < MAX_RATING; i++) {
    ratings.push(i);
  }

  return (
    <>
      {ratings.map((rate) => (
        <svg width="17" height="16" aria-hidden="true" key={`${id}-${rate}`}>
          <use data-testid="star" xlinkHref={rate < rating ? '#icon-full-star' : '#icon-star'}></use>
        </svg>
      ))}
    </>
  );
}

export default Rating;
