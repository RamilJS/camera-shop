import { screen, render } from '@testing-library/react';
import ProductTabs from './product-tabs';
import { withStore, withHistory } from '../../utils-test/mock-component';
import { makeFakeCamera, makeFakePromoCamera } from '../../utils-test/mocks';
import { NameSpace, Status } from '../../const';

const fakeCamera = makeFakeCamera();
const mockPromoCamera = [makeFakePromoCamera(), makeFakePromoCamera()];
const fakeCameras = [makeFakeCamera(), makeFakeCamera(), makeFakeCamera(), makeFakeCamera(), makeFakeCamera()];

describe('Component: ProductTabs', () => {

  it('should render correctly', () => {
    const productTabsTestId = 'product-tabs-test';

    const { withStoreComponent } = withStore(<ProductTabs />, {
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

    expect(screen.getByTestId(productTabsTestId)).toBeInTheDocument();
  });

  it('should render DescriptionTab', () => {
    const descriptionTabBtn = 'Описание';

    const { withStoreComponent } = withStore(<ProductTabs />, {
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

    expect(screen.getByText(descriptionTabBtn)).toBeInTheDocument();
    expect(screen.getByText(fakeCamera.description)).toBeInTheDocument();
  });

  it('should render SpecificationsTab', () => {
    const specificationsTabBtn = 'Характеристики';

    const { withStoreComponent } = withStore(<ProductTabs />, {
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

    expect(screen.getByText(specificationsTabBtn)).toBeInTheDocument();

    expect(screen.getByText(fakeCamera.category)).toBeInTheDocument();
    expect(screen.getByText(fakeCamera.level)).toBeInTheDocument();
    expect(screen.getByText(fakeCamera.type)).toBeInTheDocument();
  });

});
