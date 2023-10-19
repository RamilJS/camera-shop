import { render, screen } from '@testing-library/react';
import { withHistory } from '../../utils-test/mock-component';
import NotFoundPage from './not-found-page';

describe('Page: NotFoundPage', () => {
  it('should render correctly', () => {

    render(withHistory(<NotFoundPage/>));

    const headerElement = screen.getByText('Error 404');
    const linkElement = screen.getByText('Go to main page');

    expect(headerElement).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
  });
});

