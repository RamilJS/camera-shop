import { render, screen } from '@testing-library/react';
import CatalogSort from './catalog-sort';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { makeFakeCamera, makeFakePromoCamera, makeFakeReview } from '../../utils-test/mocks';
import { NameSpace, Status } from '../../const';

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
    },
    [NameSpace.ReviewsData]: {
      reviews: mockReviews,
      status: Status.Unsent,
      postReviewSuccessStatus: false,
      addReviewModalOpen: false,
      reviewPostingStatus: Status.Unsent,
    },
  },
};

const fakeApp = (
  <Provider store={mockStore({...fakeStore})}>
    <BrowserRouter>
      <HelmetProvider>
        <CatalogSort />
      </HelmetProvider>
    </BrowserRouter>
  </Provider>
);

describe('Component: CatalogSort', () => {
  it('should render correctly', () => {
    render(fakeApp);

    expect(screen.getByText('Сортировать:')).toBeInTheDocument();
    expect(screen.getByText('по цене')).toBeInTheDocument();
    expect(screen.getByText('по популярности')).toBeInTheDocument();
    expect(screen.getByText('по цене')).toBeInTheDocument();
    expect(screen.getByText('по цене')).toBeInTheDocument();
  });
});

