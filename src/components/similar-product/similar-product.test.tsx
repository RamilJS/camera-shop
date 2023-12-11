import { screen, render } from '@testing-library/react';
import SimilarProduct from './similar-product';
import { withHistory, withStore } from '../../utils-test/mock-component';
import { makeFakeCamera, makeFakePromoCamera, makeFakeReview } from '../../utils-test/mocks';
import { NameSpace, Status } from '../../const';

const fakeCamera = makeFakeCamera();
const mockPromoCamera = [makeFakePromoCamera(), makeFakePromoCamera()];
const fakeCameras = [makeFakeCamera(), makeFakeCamera(), makeFakeCamera(), makeFakeCamera(), makeFakeCamera()];
const mockReviews = [makeFakeReview(), makeFakeReview(), makeFakeReview(), makeFakeReview(), makeFakeReview(), makeFakeReview()];

describe('Component: SimilarProduct', () => {

  it('should render correctly', () => {
    const similarProductText = 'Похожие товары';

    const { withStoreComponent } = withStore(<SimilarProduct/>, {
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

    const cameraCards = screen.getAllByTestId('camera-card-test');
    expect(cameraCards).toHaveLength(fakeCameras.length);

    expect(screen.getByText(similarProductText)).toBeInTheDocument();
  });

});
