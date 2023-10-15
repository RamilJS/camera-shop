import { Reviews } from '../../types/reviews';
import { State } from '../../types/state';
import { NameSpace, Status } from '../../const';

//получение отзывов и статуса загрузки
export const getReviews = (state: State): Reviews => state[NameSpace.ReviewsData].reviews;
export const getReviewsStatus = (state: State): Status => state[NameSpace.ReviewsData].status;

//статус отправки нового отзыва на сервер
export const getPostReviewStatus = (state: State): Status => state[NameSpace.ReviewsData].postStatus;
export const getAddRevieModalOpenStatus = (state: State): boolean => state[NameSpace.ReviewsData].addReviewModalOpen;
