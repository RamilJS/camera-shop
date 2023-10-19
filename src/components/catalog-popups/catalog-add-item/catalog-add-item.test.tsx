import { render, screen } from '@testing-library/react';
import CatalogAddItem from './catalog-add-item';
import { makeFakeCamera } from '../../../utils-test/mocks';

describe('Component: CatalogAddItem', () => {
  it('should render correctly', () => {
    const addProductText = 'Добавить товар в корзину';
    const addToBasketText = 'Добавить в корзину';
    const modalBuyTestId = 'modal-buy-test';

    render(
      <CatalogAddItem
        camera={makeFakeCamera()}
        handleAddToBasketClick={vi.fn()}
        handleModalClose={vi.fn()}
      />);

    expect(screen.getByText(addProductText)).toBeInTheDocument();
    expect(screen.getByText(addToBasketText)).toBeInTheDocument();
    expect(screen.getByTestId(modalBuyTestId)).toBeInTheDocument();
  });
});
