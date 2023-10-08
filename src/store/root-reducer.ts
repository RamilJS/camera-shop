import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { camerasSlice } from './cameras-data/cameras-data';
import { productSlice } from './product-data/product-data';

export const rootReducer = combineReducers({
  [NameSpace.CamerasData]: camerasSlice.reducer,
  [NameSpace.ProductData]: productSlice.reducer,
});
