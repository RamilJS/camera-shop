import { screen, render } from '@testing-library/react';
import ReviewListBlock from './review-list-block';
import { withHistory, withStore } from '../../utils-test/mock-component';
import { makeFakeCamera, makeFakePromoCamera, makeFakeReview } from '../../utils-test/mocks';
import { sortReviewsByDate } from '../../utils';
import { NameSpace, Status } from '../../const';

const fakeCamera = makeFakeCamera();
const mockPromoCamera = [makeFakePromoCamera(), makeFakePromoCamera()];
const fakeCameras = [makeFakeCamera(), makeFakeCamera(), makeFakeCamera(), makeFakeCamera(), makeFakeCamera()];
const mockReviews = [makeFakeReview(), makeFakeReview(), makeFakeReview(), makeFakeReview(), makeFakeReview(), makeFakeReview()];


describe('Component: ReviewListBlock', () => {
  const sortedReviews = sortReviewsByDate(mockReviews);

  it('should render text correctly', () => {
    const showMoreReviewsText = 'Показать больше отзывов';

    const { withStoreComponent } = withStore(<ReviewListBlock/>, {
      [NameSpace.CamerasData]: {
        cameras: {
          data: fakeCameras,
          status: Status.Unsent,
          isLoading: false,
        },
        camera: {
          product: fakeCamera,
          isLoading: false,
          similarCameras: fakeCameras,
          isSimilarLoading: false,
          successModalOpen: false,
        },
        promoCamera: {
          data: mockPromoCamera,
          status: Status.Unsent,
        },
        modalCameras: {
          cameraInBasketModal: fakeCamera,
        },
      },
      [NameSpace.ReviewsData]: {
        reviews: mockReviews,
        status: Status.Unsent,
        postReviewSuccessStatus: false,
        addReviewModalOpen: false,
        reviewPostingStatus: Status.Unsent,
      },

    });
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    const button = screen.getByRole('button', { name: /Оставить свой отзыв/i });

    expect(button).toBeInTheDocument();
    expect(screen.getByText(showMoreReviewsText)).toBeInTheDocument();
  });

  it('Initial reviews should be displayed', () => {
    const DEFAULT_RENDERED_REVIEWS_COUNT = 3;

    const { withStoreComponent } = withStore(<ReviewListBlock/>, {
      [NameSpace.CamerasData]: {
        cameras: {
          data: fakeCameras,
          status: Status.Unsent,
          isLoading: false,
        },
        camera: {
          product: fakeCamera,
          isLoading: false,
          similarCameras: fakeCameras,
          isSimilarLoading: false,
          successModalOpen: false,
        },
        promoCamera: {
          data: mockPromoCamera,
          status: Status.Unsent,
        },
        modalCameras: {
          cameraInBasketModal: fakeCamera,
        },
      },
      [NameSpace.ReviewsData]: {
        reviews: mockReviews,
        status: Status.Unsent,
        postReviewSuccessStatus: false,
        addReviewModalOpen: false,
        reviewPostingStatus: Status.Unsent,
      },

    });
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    sortedReviews.slice(0, DEFAULT_RENDERED_REVIEWS_COUNT).forEach((review) => {
      const reviewText = screen.getByText(review.review);
      expect(reviewText).toBeInTheDocument();
    });
  });
});
