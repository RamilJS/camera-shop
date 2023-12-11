import { render, screen } from '@testing-library/react';
import ProductItem from './product-item';
import { withStore, withHistory } from '../../utils-test/mock-component';
import { makeFakeCamera, makeFakePromoCamera } from '../../utils-test/mocks';
import { NameSpace, Status } from '../../const';

const fakeCamera = makeFakeCamera();
const mockPromoCamera = [makeFakePromoCamera(), makeFakePromoCamera()];
const fakeCameras = [makeFakeCamera(), makeFakeCamera(), makeFakeCamera(), makeFakeCamera(), makeFakeCamera()];

describe('Component: ProductItem', () => {
  it('should render correctly', () => {
    const reviewCountText = 'Всего оценок:';
    const priceText = 'Цена:';

    const { withStoreComponent } = withStore(<ProductItem camera={fakeCamera}/>, {
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
      }
    });
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByText(reviewCountText)).toBeInTheDocument();
    expect(screen.getByText(priceText)).toBeInTheDocument();
  });

  it('render the ProductItem with camera data', () => {

    const { withStoreComponent } = withStore(<ProductItem camera={fakeCamera}/>, {
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
      }
    });
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    screen.getAllByText(fakeCamera.name).forEach((textElement) => {
      expect(textElement).toBeInTheDocument();
    });

    expect(screen.getByText(fakeCamera.description)).toBeInTheDocument();
    expect(screen.getByText(fakeCamera.reviewCount)).toBeInTheDocument();
  });

  it('should render Loading', () => {
    const loadingText = 'Loading...';

    const { withStoreComponent } = withStore(<ProductItem camera={fakeCamera}/>, {
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
      }
    });
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByText(loadingText)).toBeInTheDocument();
  });
});
