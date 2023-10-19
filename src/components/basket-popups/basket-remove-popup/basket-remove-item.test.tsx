import { render, screen } from '@testing-library/react';
import BasketRemoveItem from './basket-remove-item';

describe('Component: BasketRemoveItem', () => {

  it('should render correctly', () => {

    render(<BasketRemoveItem/>);

    expect(screen.getByText('Удалить этот товар?')).toBeInTheDocument();
    expect(screen.getByText('Удалить')).toBeInTheDocument();
    expect(screen.getByText('Продолжить покупки')).toBeInTheDocument();
  });
});
