import { render, screen } from '@testing-library/react';
import BasketList from './basket-list';

describe('Component: BasketList', () => {
  it('should render correctly', () => {
    const basketContainerTestId = 'basket-container';

    render(<BasketList/>);
    const basketContainer = screen.getByTestId(basketContainerTestId);

    expect(basketContainer).toBeInTheDocument();
  });
});
