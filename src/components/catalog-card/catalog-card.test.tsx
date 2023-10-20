import { screen, render, fireEvent } from '@testing-library/react';
import CatalogCard from './catalog-card';
import { withHistory, withStore } from '../../utils-test/mock-component';
import { makeFakeCamera, makeFakePromoCamera, makeFakeReview } from '../../utils-test/mocks';
import { NameSpace, Status } from '../../const';

const fakeCamera = makeFakeCamera();
const mockPromoCamera = [makeFakePromoCamera(), makeFakePromoCamera()];
const fakeCameras = [makeFakeCamera(), makeFakeCamera(), makeFakeCamera(), makeFakeCamera(), makeFakeCamera()];
const mockReviews = [makeFakeReview(), makeFakeReview(), makeFakeReview(), makeFakeReview(), makeFakeReview(), makeFakeReview()];

describe('Component: CatalogCard', () => {

  it('should render correctly', () => {
    const catalogTestId = 'camera-card-test';

    const { withStoreComponent } = withStore(<CatalogCard camera={fakeCamera} productClassName={'is-active'}/>, {
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

    const cameraCardImage: HTMLImageElement = screen.getByRole('img');

    expect(screen.getByTestId(catalogTestId)).toBeInTheDocument();
    expect(cameraCardImage).toBeInTheDocument();
    expect(screen.getByText(fakeCamera.reviewCount)).toBeInTheDocument();
    expect(screen.getByText(fakeCamera.name)).toBeInTheDocument();
  });

  it('should navigate to the product page on click to link', () => {
    const moreDetailText = 'Подробнее';

    const { withStoreComponent } = withStore(<CatalogCard camera={fakeCamera} productClassName={''}/>, {
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

    const cameraCardLink = screen.getByText(moreDetailText);
    expect(screen.getByText(moreDetailText)).toBeInTheDocument();
    fireEvent.click(cameraCardLink);
  });
});
