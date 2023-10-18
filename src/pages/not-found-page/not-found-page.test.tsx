import { render, screen } from '@testing-library/react';
import HistoryRouter from '../../hocs/history-router';
import { HelmetProvider } from 'react-helmet-async';
import { createMemoryHistory } from 'history';
import NotFoundPage from './not-found-page';

describe('Page: NotFoundPage', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <HelmetProvider>
          <NotFoundPage />
        </HelmetProvider>
      </HistoryRouter>,
    );

    const headerElement = screen.getByText('Error 404');
    const linkElement = screen.getByText('Go to main page');

    expect(headerElement).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
  });
});

