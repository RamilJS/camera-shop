import { render, screen } from '@testing-library/react';
import BasketPromo from './basket-promo';

describe('Component: BasketPromo', () => {

  it('should render correctly', () => {

    render(<BasketPromo/>);

    expect(screen.getByText('Промокод')).toBeInTheDocument();
    expect(screen.getByText('Если у вас есть промокод на скидку, примените его в этом поле')).toBeInTheDocument();
  });
});
