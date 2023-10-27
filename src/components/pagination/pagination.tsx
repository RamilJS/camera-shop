import { Link } from 'react-router-dom';

type PaginationProps = {
  showPrevButton: boolean;
  showNextButton: boolean;
  currentPage: number;
  handlePageChange: (arg0: number) => void;
  pageNumbers: number[];
}

function Pagination({showPrevButton, showNextButton, currentPage, handlePageChange, pageNumbers}: PaginationProps): JSX.Element {

  return (
    <div className="pagination" data-testid="pagination-container">
      <ul className="pagination__list">
        {showPrevButton && (
          <li className="pagination__item">
            <Link
              className="pagination__link"
              to={currentPage > 2 ? `?page=${currentPage - 1}` : '/'}
              onClick={() => {
                handlePageChange(currentPage - 1);
              }}
            >
              Назад
            </Link>
          </li>
        )}

        {pageNumbers.map((pageNumber) => (
          <li key={pageNumber} className="pagination__item">
            <Link
              className={`pagination__link ${pageNumber === currentPage ? 'pagination__link--active' : ''}`}
              to={`?page=${pageNumber}`}
              onClick={() => {
                handlePageChange(pageNumber);
              }}
            >
              {pageNumber}
            </Link>
          </li>
        ))}

        {showNextButton && (
          <li className="pagination__item">
            <Link
              className="pagination__link pagination__link--text"
              to={currentPage < 4 ? `?page=${currentPage + 1}` : '/'}
              onClick={() => {
                handlePageChange(currentPage + 1);
              }}
            >
              Далее
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Pagination;
