import { screen, render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { generatePath } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../../hocs/history-router';
import App from './app';
import { makeFakeCamera, makeFakePromoCamera, makeFakeReview } from '../../utils-test/mocks';
import { AppRoute, NameSpace, Status } from '../../const';

const mockStore = configureMockStore([thunk]);
const history = createMemoryHistory();

const fakeCamera = makeFakeCamera();
const mockPromoCamera = [makeFakePromoCamera(), makeFakePromoCamera()];
const fakeCameras = [makeFakeCamera(), makeFakeCamera()];
const mockReviews = [makeFakeReview(), makeFakeReview()];

const store = {
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
};

const fakeApp = (
  <Provider store={mockStore({...store})}>
    <HistoryRouter history={history}>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </HistoryRouter>
  </Provider>
);

describe('Application Routing', () => {

  it('should render "Catalog" when user navigate to "/"', () => {
    const catalogTestId = 'catalog-test-container';
    const catalogText = 'Каталог фото- и видеотехники';

    history.push(AppRoute.Main);
    render(fakeApp);

    expect(screen.getByText(catalogText)).toBeInTheDocument();
    expect(screen.getByTestId(catalogTestId)).toBeInTheDocument();
  });

  it('should render "Product" when user navigate to "/cameras/:id/:tab"', () => {
    const productTestId = 'product-test-container';
    history.push(generatePath(AppRoute.Product, {id: String(fakeCamera.id), tab: AppRoute.DescriptionTab}));

    render(fakeApp);

    screen.getAllByText(fakeCamera.name).forEach((textElement) => {
      expect(textElement).toBeInTheDocument();
    });

    expect(screen.getByText(fakeCamera.description)).toBeInTheDocument();
    expect(screen.getByText(fakeCamera.reviewCount)).toBeInTheDocument();
    expect(screen.getByTestId(productTestId)).toBeInTheDocument();
  });

  it('should render "Basket" when user navigate to "/basket"', () => {
    history.push(AppRoute.Basket);

    render(fakeApp);

    expect(screen.getByTestId('basket-section')).toBeInTheDocument();
    expect(screen.getByTestId('basket-title')).toBeInTheDocument();
  });

  it('should render "NotFoundScreen" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');

    render(fakeApp);

    expect(screen.getByText('Error 404')).toBeInTheDocument();
    expect(screen.getByText('Go to main page')).toBeInTheDocument();
  });

});
