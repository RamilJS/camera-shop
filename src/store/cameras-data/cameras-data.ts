import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { fetchCamerasAction } from '../api-actions';
import { fetchPromoAction } from '../api-actions';
import { fetchCameraAction } from '../api-actions';
import { fetchSimilarCamerasAction } from '../api-actions';
import { NameSpace, Status } from '../../const';
import { Camera } from '../../types/camera';
import { Promo } from '../../types/promo';

export type CameraSlice = {
  cameras: {
    data: Camera[];
    status: Status;
  };
  camera: {
    product: Camera | null;
    isLoading: boolean;
    similarCameras: Camera[];
    isSimilarLoading: boolean;
    isModalBuy: boolean;
  };
  promoCamera: {
    data: Promo[] | null;
    status: Status;
  };
};

const initialState: CameraSlice = {
  cameras: {
    data: [],
    status: Status.Unsent,
  },
  camera: {
    product: null,
    isLoading: false,
    similarCameras: [],
    isSimilarLoading: false,
    isModalBuy: false,
  },
  promoCamera: {
    data: null,
    status: Status.Unsent,
  }
};

export const camerasSlice = createSlice({
  name: NameSpace.CamerasData,
  initialState,
  reducers: {
    selectCamera: (state, action: PayloadAction<Camera>) => {
      state.camera.product = action.payload;
    },
    modalBuy: (state, action: PayloadAction<boolean>) => {
      state.camera.isModalBuy = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCamerasAction.pending, (state) => {
        state.cameras.status = Status.Pending;
      })
      .addCase(fetchCamerasAction.fulfilled, (state, action) => {
        state.cameras.data = action.payload;
        state.cameras.status = Status.Success;
      })
      .addCase(fetchCamerasAction.rejected, (state) => {
        state.cameras.status = Status.Error;
      })
      .addCase(fetchPromoAction.pending, (state) => {
        state.promoCamera.status = Status.Pending;
      })
      .addCase(fetchPromoAction.fulfilled, (state, action) => {
        state.promoCamera.data = action.payload;
        state.promoCamera.status = Status.Success;
      })
      .addCase(fetchPromoAction.rejected, (state) => {
        state.promoCamera.status = Status.Error;
      })
      .addCase(fetchCameraAction.pending,(state) => {
        state.camera.isLoading = true;
      })
      .addCase(fetchCameraAction.fulfilled,(state, action) => {
        state.camera.isLoading = false;
        state.camera.product = action.payload;
      })
      .addCase(fetchCameraAction.rejected,(state) => {
        state.camera.isLoading = false;
      })
      .addCase(fetchSimilarCamerasAction.pending,(state) => {
        state.camera.isSimilarLoading = true;
      })
      .addCase(fetchSimilarCamerasAction.fulfilled,(state, action) => {
        state.camera.isSimilarLoading = false;
        state.camera.similarCameras = action.payload;
      })
      .addCase(fetchSimilarCamerasAction.rejected,(state) => {
        state.camera.isSimilarLoading = false;
      });
  }
});

export const {selectCamera, modalBuy} = camerasSlice.actions;
