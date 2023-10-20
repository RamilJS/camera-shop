import { screen, render } from '@testing-library/react';
import ProductAddReview from './product-add-review';
import { withStore, withHistory } from '../../utils-test/mock-component';
import { makeFakeReview, makeFakeCamera, makeFakePromoCamera } from '../../utils-test/mocks';
import { NameSpace, Status } from '../../const';

const mockReviews = [makeFakeReview(), makeFakeReview()];
const fakeCamera = makeFakeCamera();
const mockPromoCamera = [makeFakePromoCamera(), makeFakePromoCamera()];
const fakeCameras = [makeFakeCamera(), makeFakeCamera(), makeFakeCamera(), makeFakeCamera(), makeFakeCamera()];

describe('Component: ProductAddReview', () => {
  it('should render correctly', () => {
    const addReviewText = 'Оставить отзыв';

    const { withStoreComponent } = withStore(<ProductAddReview/>, {
      [NameSpace.CamerasData]: {
        cameras: {
          data: fakeCameras,
          status: Status.Unsent,
        },
        camera: {
          product: fakeCamera,
          isLoading: true,
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
        addReviewModalOpen: true,
        reviewPostingStatus: Status.Unsent,
      },
    });
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByText(addReviewText)).toBeInTheDocument();
  });

  it('should render ReactModal with the correct props', () => {

    const { withStoreComponent } = withStore(<ProductAddReview/>, {
      [NameSpace.CamerasData]: {
        cameras: {
          data: fakeCameras,
          status: Status.Unsent,
        },
        camera: {
          product: fakeCamera,
          isLoading: true,
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
        addReviewModalOpen: true,
        reviewPostingStatus: Status.Unsent,
      },
    });
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    const reactModal = screen.getByRole('dialog', {hidden: true});

    expect(reactModal).toBeInTheDocument();
    expect(reactModal).toHaveAttribute('aria-modal', 'true');
    expect(reactModal).toHaveClass('ReactModal__Content');

    const crossBtn = screen.getByLabelText('Закрыть попап');
    expect(crossBtn).toBeInTheDocument();
  });
});
