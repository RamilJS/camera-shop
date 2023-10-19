import { render, screen } from '@testing-library/react';
import { withHistory } from '../../utils-test/mock-component';
import Footer from './footer';
import { AppRoute } from '../../const';

describe('Component: Footer', () => {
  it('should render correctly', () => {
    render(withHistory(<Footer/>));

    const homeLink = screen.getByText('Каталог');

    expect(screen.getByText('Интернет-магазин фото- и видеотехники')).toBeInTheDocument();
    expect(screen.getByText('Навигация')).toBeInTheDocument();
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', AppRoute.Main);
  });
});
