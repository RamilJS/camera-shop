import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  fetchCamerasAction,
  fetchPromoAction,
  fetchCameraAction,
  fetchSimilarCamerasAction,
} from '../api-actions';
import { NameSpace, Status } from '../../const';
import { Camera } from '../../types/camera';
import { Promo } from '../../types/promo';

export type CamerasSlice = {
  cameras: {
    data: Camera[];
    status: Status;
    isLoading: boolean;
  };
  camera: {
    product: Camera | null;
    isLoading: boolean;
    similarCameras: Camera[];
    isSimilarLoading: boolean;
    successModalOpen: boolean;
  };
  promoCamera: {
    data: Promo[] | null;
    status: Status;
  };
  modalCameras: {
    cameraInBasketModal: Camera | null;
  };
};

export const initialState: CamerasSlice = {
  cameras: {
    data: [],
    status: Status.Unsent,
    isLoading: false,
  },
  camera: {
    product: null,
    isLoading: false,
    similarCameras: [],
    isSimilarLoading: false,
    successModalOpen: false,
  },
  promoCamera: {
    data: null,
    status: Status.Unsent,
  },
  modalCameras: {
    cameraInBasketModal: null,
  },
};

export const camerasSlice = createSlice({
  name: NameSpace.CamerasData,
  initialState,
  reducers: {
    setCameraInBasketModal: (state, action: PayloadAction<Camera | null>) => {
      state.modalCameras.cameraInBasketModal = action.payload;
    },
    setSuccessModalOpen: (state, action: PayloadAction<boolean>) => {
      state.camera.successModalOpen = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCamerasAction.pending, (state) => {
        state.cameras.status = Status.Pending;
        state.cameras.isLoading = true;
      })
      .addCase(fetchCamerasAction.fulfilled, (state, action) => {
        state.cameras.data = action.payload;
        state.cameras.status = Status.Success;
        state.cameras.isLoading = false;
      })
      .addCase(fetchCamerasAction.rejected, (state) => {
        state.cameras.status = Status.Error;
        state.cameras.isLoading = false;
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

export const {setCameraInBasketModal, setSuccessModalOpen} = camerasSlice.actions;
