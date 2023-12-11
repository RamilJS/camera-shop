import { screen, render } from '@testing-library/react';
import Catalog from './catalog';
import { withHistory, withStore } from '../../utils-test/mock-component';
import { makeFakeCamera, makeFakePromoCamera } from '../../utils-test/mocks';
import { NameSpace, Status } from '../../const';

const fakeCamera = makeFakeCamera();
const mockPromoCamera = [makeFakePromoCamera(), makeFakePromoCamera()];
const fakeCameras = [makeFakeCamera(), makeFakeCamera(), makeFakeCamera(), makeFakeCamera(), makeFakeCamera()];

describe('Page: Catalog ', () => {

  it('should render correctly', () => {
    const catalogTestId = 'catalog-test-container';
    const catalogText = 'Каталог фото- и видеотехники';

    const { withStoreComponent } = withStore(<Catalog />, {
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
    });
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByText(catalogText)).toBeInTheDocument();
    expect(screen.getByTestId(catalogTestId)).toBeInTheDocument();
  });

});
