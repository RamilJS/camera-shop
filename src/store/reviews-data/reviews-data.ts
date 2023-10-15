import { createSlice,PayloadAction } from '@reduxjs/toolkit';
//import { toast } from 'react-toastify';
import { Reviews } from '../../types/reviews';
import { fetchReviewsAction } from '../api-actions';
import { fetchPostReviewsAction } from '../api-actions';
import { NameSpace, Status } from '../../const';


export type ReviewsSlice = {
  reviews: Reviews;
  status: Status;
  postStatus: Status;
  addReviewModalOpen: boolean;
}

const initialState: ReviewsSlice = {
  reviews: [],
  status: Status.Unsent,
  postStatus: Status.Unsent,
  addReviewModalOpen: false,
};

export const reviewsSlice = createSlice({
  name: NameSpace.ReviewsData,
  initialState,
  reducers: {
    setAddReviewModalOpen: (state, action: PayloadAction<boolean>) => {
      state.addReviewModalOpen = action.payload;
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

export const { setAddReviewModalOpen } = reviewsSlice.actions;
