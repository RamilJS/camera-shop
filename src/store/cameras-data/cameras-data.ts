import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchCamerasAction } from '../api-actions';
import { fetchPromoAction } from '../api-actions';
import { fetchCameraAction } from '../api-actions';
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
    loadingStatus: Status;
    successModalOpen: boolean;
    //similarCameras: Camera[];
    //isSimilarCamerasLoading: boolean;
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
    loadingStatus: Status.Unsent,
    successModalOpen: false,
    //similarCameras: [],
    //isSimilarCamerasLoading: false,
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
    selectProduct: (state, action: PayloadAction<Camera | null>) => {
      state.camera.product = action.payload;
      //state.loadingStatus = Status.Success;
    },
    setSuccessModalOpen: (state, action: PayloadAction<boolean>) => {
      state.camera.successModalOpen = action.payload;
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
        state.camera.loadingStatus = Status.Pending;
      })
      .addCase(fetchCameraAction.fulfilled,(state, action) => {
        state.camera.loadingStatus = Status.Success;
        state.camera.product = action.payload;
      })
      .addCase(fetchCameraAction.rejected,(state) => {
        state.camera.loadingStatus = Status.Error;
      });
  }
});

//export const {selectProduct, setSuccessModalOpen } = productSlice.actions;

