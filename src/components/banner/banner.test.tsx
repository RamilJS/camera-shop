import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { makeFakePromos } from '../../utils-test/mocks';
import Banner from './banner';
import { NameSpace, Status } from '../../const';

const mockStore = configureMockStore([thunk]);

const mockPromoCamera = makeFakePromos();


export const fakeStore = {
  [NameSpace.CamerasData]: {
    promoCamera: {
      data: mockPromoCamera,
      status: Status.Unsent,
    }
  },
};

const fakeApp = (
  <Provider store={mockStore({...fakeStore})}>
    <BrowserRouter>
      <Banner promoCamera={mockPromoCamera}/>
    </BrowserRouter>
  </Provider>
);

describe('Component: Banner', () => {

  it('should render correctly', () => {
    render(fakeApp);

    expect(screen.getByText(mockPromoCamera[0].name)).toBeInTheDocument();
    expect(screen.getByText(mockPromoCamera[1].name)).toBeInTheDocument();
  });
});
