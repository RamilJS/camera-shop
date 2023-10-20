import { screen, render } from '@testing-library/react';
import ReviewCard from './review-card';
import { formatDate } from '../../utils';
import { makeFakeReview } from '../../utils-test/mocks';

describe('Component: ReviewCard', () => {
  const fakeReview = makeFakeReview();

  it('should render correctly', () => {

    render(<ReviewCard review={fakeReview}/>);

    expect(screen.getByText(fakeReview.userName)).toBeInTheDocument();
    expect(screen.getByText(formatDate(fakeReview.createAt))).toBeInTheDocument();
    expect(screen.getByText(`Оценка: ${ fakeReview.rating.toString()}`)).toBeInTheDocument();
    expect(screen.getByText(fakeReview.advantage)).toBeInTheDocument();
    expect(screen.getByText(fakeReview.disadvantage)).toBeInTheDocument();
    expect(screen.getByText(fakeReview.review)).toBeInTheDocument();
  });
});
