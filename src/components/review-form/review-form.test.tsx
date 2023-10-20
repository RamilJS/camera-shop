import { screen, render, fireEvent } from '@testing-library/react';
import ReviewForm from './review-form';
import { withHistory, withStore } from '../../utils-test/mock-component';
import { makeFakeCamera, makeFakePromoCamera, makeFakeReview } from '../../utils-test/mocks';
import { NameSpace, Status } from '../../const';

const fakeCamera = makeFakeCamera();
const mockPromoCamera = [makeFakePromoCamera(), makeFakePromoCamera()];
const fakeCameras = [makeFakeCamera(), makeFakeCamera(), makeFakeCamera(), makeFakeCamera(), makeFakeCamera()];
const mockReviews = [makeFakeReview(), makeFakeReview(), makeFakeReview(), makeFakeReview(), makeFakeReview(), makeFakeReview()];

describe('Component: ReviewForm', () => {

  it('should render correctly', () => {

    const { withStoreComponent } = withStore(<ReviewForm/>, {
      [NameSpace.CamerasData]: {
        cameras: {
          data: fakeCameras,
          status: Status.Unsent,
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

    expect(screen.getByRole('group')).toBeInTheDocument();
  });

  it('should update the text value in the formData', () => {

    const { withStoreComponent } = withStore(<ReviewForm/>, {
      [NameSpace.CamerasData]: {
        cameras: {
          data: fakeCameras,
          status: Status.Unsent,
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

    const textareaInput: HTMLTextAreaElement = screen.getByPlaceholderText('Поделитесь своим опытом покупки');
    fireEvent.change(textareaInput, { target: { value: 'Mock comment' } });
    expect(textareaInput.value).toEqual('Mock comment');
  });
});
