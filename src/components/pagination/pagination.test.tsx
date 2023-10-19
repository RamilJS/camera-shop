import { render, screen } from '@testing-library/react';
import Pagination from './pagination';
import { withHistory, withStore } from '../../utils-test/mock-component';

describe('Component: Pagination', () => {
  it('should render correctly', () => {
    const paginationTestId = 'pagination-container';

    const { withStoreComponent } = withStore(
      <Pagination showPrevButton={false}
        showNextButton={false}
        currentPage={1}
        handlePageChange={vi.fn()}
        pageNumbers={[5, 4, 3, 2, 1]}
      />, {});
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByTestId(paginationTestId)).toBeInTheDocument();
  });

  it('should remove "previous" link on the first page', () => {
    const previousSlideText = 'Назад';
    const { withStoreComponent } = withStore(
      <Pagination showPrevButton={false}
        showNextButton={false}
        currentPage={1}
        handlePageChange={vi.fn()}
        pageNumbers={[5, 4, 3, 2, 1]}
      />, {});
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.queryByText(previousSlideText)).not.toBeInTheDocument();
  });

  it('should remove "next" link on the last page', () => {
    const nextSlideText = 'Далее';

    const { withStoreComponent } = withStore(
      <Pagination showPrevButton={false}
        showNextButton={false}
        currentPage={5}
        handlePageChange={vi.fn()}
        pageNumbers={[5, 4, 3, 2, 1]}
      />, {});
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.queryByText(nextSlideText)).not.toBeInTheDocument();
  });
});
