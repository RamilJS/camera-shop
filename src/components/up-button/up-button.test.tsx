import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import UpButton from './up-button';

describe('UpBtn component', () => {
  it('renders a link with the ".up-btn" class', () => {
    render(
      <BrowserRouter>
        <UpButton />
      </BrowserRouter>
    );

    const upBtnNode = screen.getByRole('link');
    expect(upBtnNode).toHaveClass('up-btn');
  });

  it('scrolls to the top of the page when the link is clicked', () => {
    const scrollTo = vi.fn();
    window.scrollTo = scrollTo;

    render(
      <BrowserRouter>
        <UpButton />
      </BrowserRouter>
    );

    const upBtnNode = screen.getByRole('link');

    fireEvent.click(upBtnNode);

    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });
});
