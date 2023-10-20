import { screen, render} from '@testing-library/react';
import CatalogCardList from './catalog-card-list';
import { makeFakeCamera, makeFakePromoCamera, makeFakeReview } from '../../utils-test/mocks';
import { withHistory, withStore } from '../../utils-test/mock-component';
import { NameSpace, Status } from '../../const';

const fakeCamera = makeFakeCamera();
const mockPromoCamera = [makeFakePromoCamera(), makeFakePromoCamera()];
const fakeCameras = [makeFakeCamera(), makeFakeCamera(), makeFakeCamera(), makeFakeCamera(), makeFakeCamera()];
const mockReviews = [makeFakeReview(), makeFakeReview(), makeFakeReview(), makeFakeReview(), makeFakeReview(), makeFakeReview()];


describe('Component: CatalogCardList', () => {

  it('should render correctly', () => {
    const cameraCardTestId = 'camera-cards-test';

    const { withStoreComponent } = withStore(<CatalogCardList cameras={fakeCameras}/>, {
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

    expect(screen.getByTestId(cameraCardTestId)).toBeInTheDocument();
  });

});
