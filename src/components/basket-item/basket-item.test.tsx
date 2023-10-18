import { render, screen } from '@testing-library/react';
import BasketItem from './basket-item';

describe('Component: BasketItem', () => {

  it('should render correctly', () => {
    const articulText = /Артикул:/;
    const priceText = /Цена:/;
    const commonPriceText = /Общая цена:/;

    render(<BasketItem/>);

    expect(screen.getByText(articulText)).toBeInTheDocument();
    expect(screen.getByText(priceText)).toBeInTheDocument();
    expect(screen.getByText(commonPriceText)).toBeInTheDocument();
  });
});
