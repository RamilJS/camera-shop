import { Reviews } from '../../types/reviews';
import { State } from '../../types/state';
import { NameSpace, Status } from '../../const';

export const getReviews = (state: State): Reviews => state[NameSpace.ReviewsData].reviews;
export const getReviewsStatus = (state: State): Status => state[NameSpace.ReviewsData].status;
