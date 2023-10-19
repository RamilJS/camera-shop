import { render, screen } from '@testing-library/react';
import CatalogAddSucces from './catalog-add-succes';
import { withHistory } from '../../../utils-test/mock-component';

describe('Component: CatalogAddSucces', () => {
  it('should render correctly', () => {
    const addSuccesProductText = 'Товар успешно добавлен в корзину';
    const continueShoppingText = 'Продолжить покупки';
    const goToBasket = 'Перейти в корзину';
    const modalBuyTestId = 'modal-order-success';

    render(withHistory(
      <CatalogAddSucces
        handleModalClose={vi.fn()}
        handleLinkToBasketClick={vi.fn()}
      />));

    expect(screen.getByText(addSuccesProductText)).toBeInTheDocument();
    expect(screen.getByText(continueShoppingText)).toBeInTheDocument();
    expect(screen.getByText(goToBasket)).toBeInTheDocument();
    expect(screen.getByTestId(modalBuyTestId)).toBeInTheDocument();
  });
});
