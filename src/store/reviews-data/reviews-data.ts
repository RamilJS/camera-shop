import { createSlice,PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { Reviews } from '../../types/reviews';
import { fetchReviewsAction } from '../api-actions';
import { fetchPostReviewsAction } from '../api-actions';
import { NameSpace, Status } from '../../const';

export type ReviewsSlice = {
  reviews: Reviews;
  status: Status;
  postReviewSuccessStatus: boolean;
  addReviewModalOpen: boolean;
  reviewPostingStatus: Status;
}

const initialState: ReviewsSlice = {
  reviews: [],
  status: Status.Unsent,
  postReviewSuccessStatus: false,
  addReviewModalOpen: false,
  reviewPostingStatus: Status.Unsent,
};

export const reviewsSlice = createSlice({
  name: NameSpace.ReviewsData,
  initialState,
  reducers: {
    setAddReviewModalOpen: (state, action: PayloadAction<boolean>) => {
      state.addReviewModalOpen = action.payload;
    },
    setPostReviewSuccessStatus: (state, action: PayloadAction<boolean>) => {
      state.postReviewSuccessStatus = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchReviewsAction.pending, (state) => {
        state.status = Status.Pending;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.status = Status.Success;
      })
      .addCase(fetchReviewsAction.rejected, (state) => {
        state.status = Status.Error;
      })
      .addCase(fetchPostReviewsAction.pending, (state) => {
        state.reviewPostingStatus = Status.Pending;
      })
      .addCase(fetchPostReviewsAction.fulfilled, (state) => {
        state.postReviewSuccessStatus = true;
        state.reviewPostingStatus = Status.Success;
      })
      .addCase(fetchPostReviewsAction.rejected, (state) => {
        state.postReviewSuccessStatus = false;
        state.reviewPostingStatus = Status.Error;
        toast.warn('Отзыв не отправлен');
      });
  }
});

export const { setAddReviewModalOpen, setPostReviewSuccessStatus } = reviewsSlice.actions;
