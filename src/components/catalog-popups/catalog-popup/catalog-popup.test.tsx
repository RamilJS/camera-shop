import { render, screen, waitFor } from '@testing-library/react';
import CatalogPopup from './catalog-popup';
import { withHistory, withStore } from '../../../utils-test/mock-component';
import { makeFakeCamera, makeFakePromoCamera } from '../../../utils-test/mocks';
import { NameSpace, Status } from '../../../const';


const mockCamera = makeFakeCamera();
const mockPromoCamera = [makeFakePromoCamera(), makeFakePromoCamera()];
const mockCameras = [makeFakeCamera(), makeFakeCamera(), makeFakeCamera(), makeFakeCamera(), makeFakeCamera()];

describe('Component: CatalogPopup', () => {
  it('should render ReactModal with the correct props', async () => {

    const { withStoreComponent } = withStore(<CatalogPopup />, {
      [NameSpace.CamerasData]: {
        cameras: {
          data: mockCameras,
          status: Status.Unsent,
          isLoading: false,
        },
        camera: {
          product: mockCamera,
          isLoading: false,
          similarCameras: mockCameras,
          isSimilarLoading: false,
          successModalOpen: false,
        },
        promoCamera: {
          data: mockPromoCamera,
          status: Status.Unsent,
        },
        modalCameras: {
          cameraInBasketModal: mockCamera,
        },
      }
    });
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    const reactModal = screen.getByRole('dialog', {hidden: true});

    await waitFor(() => {
      expect(reactModal).toBeInTheDocument();
      expect(reactModal).toHaveAttribute('aria-modal', 'true');
      expect(reactModal).toHaveClass('ReactModal__Content');
    });
  });
});
