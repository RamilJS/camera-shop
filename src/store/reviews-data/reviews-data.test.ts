import { toast } from 'react-toastify';
import { reviewsSlice, setAddReviewModalOpen, setPostReviewSuccessStatus } from './reviews-data';
import { fetchPostReviewsAction, fetchReviewsAction } from '../api-actions';
import { makeFakeReview } from '../../utils-test/mocks';
import { Status } from '../../const';

const mockReviews = [makeFakeReview(), makeFakeReview()];

vi.mock('react-toastify');

describe('Reducer: setAddReviewModalOpen', () => {
  it('should set addReviewModalOpen by a given boolean value', () => {
    const state = {
      reviews: [],
      status: Status.Unsent,
      postReviewSuccessStatus: false,
      addReviewModalOpen: false,
      reviewPostingStatus: Status.Unsent,
    };

    expect(reviewsSlice.reducer(state, setAddReviewModalOpen(true)))
      .toEqual({
        ...state,
        addReviewModalOpen: true,
      });
  });

});

describe('Reducer: setPostReviewSuccessStatus', () => {
  it('should set setPostReviewSuccessStatus by a given boolean value', () => {
    const state = {
      reviews: [],
      status: Status.Unsent,
      postReviewSuccessStatus: false,
      addReviewModalOpen: false,
      reviewPostingStatus: Status.Unsent,
    };

    expect(reviewsSlice.reducer(state, setPostReviewSuccessStatus(true)))
      .toEqual({
        ...state,
        postReviewSuccessStatus: true,
        status: Status.Unsent,
      });
  });

});

describe('extraReducers: reviewsData', () => {
  const state = {
    reviews: [],
    status: Status.Unsent,
    postReviewSuccessStatus: false,
    addReviewModalOpen: false,
    reviewPostingStatus: Status.Unsent,
  };

  it('without additional parameters should return initial state', () => {
    expect(reviewsSlice.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual(state);
  });

  describe('fetchReviewsAction', () => {
    it('should set status to Pending on fetchReviewsAction.pending', () => {
      expect(reviewsSlice.reducer(state, {type: fetchReviewsAction.pending.type}))
        .toEqual({
          ...state,
          status: Status.Pending
        });
    });

    it('should update reviews by load reviews + set status to success', () => {
      expect(reviewsSlice.reducer(state, {type: fetchReviewsAction.fulfilled.type, payload: mockReviews}))
        .toEqual({
          ...state,
          reviews: mockReviews,
          status: Status.Success
        });
    });


  });

  describe('fetchPostReviewsAction', () => {
    it('should set reviewPostingStatus to Pending when fetchPostReviewsAction.pending is called', () => {
      expect(reviewsSlice.reducer(state, {type:fetchPostReviewsAction.pending.type}))
        .toEqual({
          ...state,
          reviewPostingStatus: Status.Pending,
          status: Status.Unsent
        });
    });

    it('should set reviewPostingStatus to success & postReviewSuccessStatus to true when postReviewAction.fulfilled is called', () => {
      expect(reviewsSlice.reducer(state, {type: fetchPostReviewsAction.fulfilled.type}))
        .toEqual({
          ...state,
          status: Status.Unsent,
          reviewPostingStatus: Status.Success,
          postReviewSuccessStatus: true
        });
    });

    it('should set reviewPostingStatus to error & postReviewSuccessStatus  to false & show error whenfetchPostReviewsAction.rejected is called', () => {
      const errorMsg = 'Error';
      const action = {
        type: fetchPostReviewsAction.rejected.type,
        payload: { arg: null, requestStatus: 'rejected', requestId: '', aborted: false, condition: true },
        error: { message: errorMsg },
      };
      expect(reviewsSlice.reducer(state, action))
        .toEqual({
          ...state,
          status: Status.Unsent,
          reviewPostingStatus: Status.Error,
          postReviewSuccessStatus: false
        });
      expect(toast.warn).toHaveBeenCalledWith('Отзыв не отправлен');
    });


  });

});
