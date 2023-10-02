import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { camerasSlice } from './cameras-data/cameras-data.slice';

export const rootReducer = combineReducers({
  [NameSpace.CamerasData]: camerasSlice.reducer,
});
