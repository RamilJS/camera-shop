import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { makeFakeCamera, makeFakePromoCamera, makeFakeReview } from '../../utils-test/mocks';
import Header from './header';
import { AppRoute, NameSpace, Status } from '../../const';

const mockStore = configureMockStore([thunk]);

const mockCamera = makeFakeCamera();
const mockPromoCamera = makeFakePromoCamera();
const mockCameras = [makeFakeCamera(), makeFakeCamera(), makeFakeCamera(), makeFakeCamera(), makeFakeCamera()];
const mockReviews = [makeFakeReview(), makeFakeReview(), makeFakeReview(), makeFakeReview(), makeFakeReview()];

export const fakeStore = {
  [NameSpace.CamerasData]: {
    cameras: {
      data: mockCameras,
      status: Status.Unsent,
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
    }
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
  <Provider store={mockStore({...fakeStore})}>
    <BrowserRouter>
      <HelmetProvider>
        <Header />
      </HelmetProvider>
    </BrowserRouter>
  </Provider>
);

describe('Component: Header', () => {
  it('should render correctly', () => {
    render(
      fakeApp
    );

    const homeLinkText = 'Каталог';
    const homeLink = screen.getByText(homeLinkText);
    const headerElement = screen.getByRole('banner');
    const basketLink = screen.getByTestId('basket-link');

    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', AppRoute.Main);

    expect(headerElement).toBeInTheDocument();
    expect(headerElement).toHaveAttribute('class', 'header');

    expect(basketLink).toBeInTheDocument();
    expect(basketLink).toHaveAttribute('href', AppRoute.Basket);
  });
});
