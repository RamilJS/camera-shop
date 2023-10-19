import { render, screen } from '@testing-library/react';
import BasketSummaryOrder from './basket-summary-order';

describe('Component:  BasketSummaryOrder', () => {

  it('should render correctly', () => {

    render(< BasketSummaryOrder/>);

    expect(screen.getByText('Всего:')).toBeInTheDocument();
    expect(screen.getByText('Скидка:')).toBeInTheDocument();
    expect(screen.getByText('К оплате:')).toBeInTheDocument();
    expect(screen.getByText('Оформить заказ')).toBeInTheDocument();
  });
});
