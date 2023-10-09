import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Camera } from '../../types/camera';
import { Status } from '../../const';
import { fetchCameraAction } from '../api-actions';
import { NameSpace } from '../../const';

export type ProductSlice = {
  product: Camera | null;
  loadingStatus: Status;
  successModalOpen: boolean;
};

const initialState: ProductSlice = {
  product: null,
  loadingStatus: Status.Unsent,
  successModalOpen: false,
};

export const productSlice = createSlice({
  name: NameSpace.ProductData,
  initialState,
  reducers: {
    selectProduct: (state, action: PayloadAction<Camera | null>) => {
      state.product = action.payload;
      //state.loadingStatus = Status.Success;
    },
    setSuccessModalOpen: (state, action: PayloadAction<boolean>) => {
      state.successModalOpen = action.payload;
    },
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

export const {selectProduct, setSuccessModalOpen} = productSlice.actions;
