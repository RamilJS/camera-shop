import { createSlice } from '@reduxjs/toolkit';
import { fetchCamerasAction } from '../api-actions';
import { fetchPromoAction } from '../api-actions';
import { NameSpace, Status } from '../../const';
import { Camera } from '../../types/camera';
import { Promo } from '../../types/promo';


export type CameraSlice = {
  cameras: {
    data: Camera[];
    status: Status;
  };
  camera: {
    data: Camera | null;
    isLoading: boolean;
    similarCameras: Camera[];
    isSimilarCamerasLoading: boolean;
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
    data: null,
    isLoading: false,
    similarCameras: [],
    isSimilarCamerasLoading: false,
  },
  promoCamera: {
    data: null,
    status: Status.Unsent,
  }
};

export const camerasSlice = createSlice({
  name: NameSpace.CamerasData,
  initialState,
  reducers: {},
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
      });
  }
});

