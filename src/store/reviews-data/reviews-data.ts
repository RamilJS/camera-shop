import { createSlice } from '@reduxjs/toolkit';
//import { toast } from 'react-toastify';
import { Reviews } from '../../types/reviews';
import { fetchReviewsAction } from '../api-actions';
import { fetchPostReviewsAction } from '../api-actions';
import { NameSpace, Status } from '../../const';


export type ReviewsSlice = {
  reviews: Reviews;
  status: Status;
  postStatus: Status;
}

const initialState: ReviewsSlice = {
  reviews: [],
  status: Status.Unsent,
  postStatus: Status.Unsent,
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
      })
      .addCase(fetchPostReviewsAction.pending, (state) => {
        state.postStatus = Status.Pending;
      })
      .addCase(fetchPostReviewsAction.fulfilled, (state, action) => {
        state.reviews.push(action.payload);
        state.postStatus = Status.Success;
      })
      .addCase(fetchPostReviewsAction.rejected, (state) => {
        state.postStatus = Status.Error;
      });
  }
});
