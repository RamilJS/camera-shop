import { render, screen } from '@testing-library/react';
import BasketSuccesPurchase from './basket-succes-purchase';

describe('Component: BasketSuccesPurchase', () => {

  it('should render correctly', () => {

    render(<BasketSuccesPurchase/>);

    expect(screen.getByText('Спасибо за покупку')).toBeInTheDocument();
    expect(screen.getByText('Вернуться к покупкам')).toBeInTheDocument();
  });
});
