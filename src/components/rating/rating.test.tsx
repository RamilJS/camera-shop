import { screen, render } from '@testing-library/react';
import Rating from './rating';

describe('Component: Rating', () => {
  it('render correct count of stars', () => {
    const fakeRating = 4;
    const starTestId = 'star';

    render(<Rating rating={fakeRating} id={'test'}/>);

    const stars = screen.getAllByTestId(starTestId);

    expect(stars).toHaveLength(5);
    expect(stars.filter((star) => star.getAttribute('xlink:href') === '#icon-full-star')).toHaveLength(fakeRating);

  });
});
