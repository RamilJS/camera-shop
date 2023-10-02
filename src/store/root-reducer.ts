import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { camerasSlice } from './cameras-data/cameras-data.slice';
import { promoSlice } from './promo-data/promo-data.slice';

export const rootReducer = combineReducers({
  [NameSpace.CamerasData]: camerasSlice.reducer,
  [NameSpace.PromoData]: promoSlice.reducer,
});
