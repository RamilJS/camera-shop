import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { camerasSlice } from './cameras-data/cameras-data';
import { basketSlice } from './basket-data/basket-data';


export const rootReducer = combineReducers({
  [NameSpace.CamerasData]: camerasSlice.reducer,
  [NameSpace.BasketData]: basketSlice.reducer,
});
