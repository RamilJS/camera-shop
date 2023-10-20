import { screen, render } from '@testing-library/react';
import ProductReviewSucces from './product-review-succes';

describe('Component: ProductReviewSucces', () => {
  it('should render correctly', () => {
    const thankYouText = 'Спасибо за отзыв';
    const returnToShoppingText = 'Вернуться к покупкам';
    //const

    render(<ProductReviewSucces handleModalClose={vi.fn()}/>);

    expect(screen.getByText(thankYouText)).toBeInTheDocument();
    expect(screen.getByText(returnToShoppingText)).toBeInTheDocument();
  });
});
