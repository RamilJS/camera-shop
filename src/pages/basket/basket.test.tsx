import { render, screen } from '@testing-library/react';
import Basket from './basket';
import { withHistory } from '../../utils-test/mock-component';

describe('Page: Basket', () => {
  it('should render correctly', () => {
    const basketSectionTestId = 'basket-section';
    const basketTitleTestId = 'basket-title';

    const preparedComponent = withHistory(<Basket/>);
    render(preparedComponent);

    expect(screen.getByTestId(basketSectionTestId)).toBeInTheDocument();
    expect(screen.getByTestId(basketTitleTestId)).toBeInTheDocument();
  });
});
