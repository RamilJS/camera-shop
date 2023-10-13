import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { camerasSlice } from './cameras-data/cameras-data';
import { reviewsSlice } from './reviews-data/reviews-data';


export const rootReducer = combineReducers({
  [NameSpace.CamerasData]: camerasSlice.reducer,
  [NameSpace.ReviewsData]: reviewsSlice.reducer,
});
