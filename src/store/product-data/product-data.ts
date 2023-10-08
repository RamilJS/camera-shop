import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Camera } from '../../types/camera';
import { Status } from '../../const';
import { fetchCameraAction } from '../api-actions';
import { NameSpace } from '../../const';

export type ProductSlice = {
  product: Camera | null;
  loadingStatus: Status;
};

const initialState: ProductSlice = {
  product: null,
  loadingStatus: Status.Unsent,
};

export const productSlice = createSlice({
  name: NameSpace.ProductData,
  initialState,
  reducers: {
    selectProduct: (state, action: PayloadAction<Camera>) => {
      state.product = action.payload;
      state.loadingStatus = Status.Success;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCameraAction.pending,(state) => {
        state.loadingStatus = Status.Pending;
      })
      .addCase(fetchCameraAction.fulfilled,(state, action) => {
        state.loadingStatus = Status.Success;
        state.product = action.payload;
      })
      .addCase(fetchCameraAction.rejected,(state) => {
        state.loadingStatus = Status.Error;
      });
  },
});

