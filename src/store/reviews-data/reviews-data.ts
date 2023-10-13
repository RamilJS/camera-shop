import { createSlice } from '@reduxjs/toolkit';
import { Reviews } from '../../types/reviews';
import { NameSpace, Status } from '../../const';
import { fetchReviewsAction } from '../api-actions';

type ReviewsSlice = {
  reviews: Reviews;
  status: Status;
}

const initialState: ReviewsSlice = {
  reviews: [],
  status: Status.Pending,
};

export const reviewsSlice = createSlice({
  name: NameSpace.ReviewsData,
  initialState,
  reducers: {},
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
      });
  }
});
