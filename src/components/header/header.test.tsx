import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils-test/mock-component';
import Header from './header';
import { AppRoute } from '../../const';

describe('Component: Header', () => {
  it('should render correctly', () => {

    const { withStoreComponent } = withStore(<Header />, {});
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

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
