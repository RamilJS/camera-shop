import { createSlice } from '@reduxjs/toolkit';
import { fetchCamerasAction } from '../api-actions';
import { NameSpace, Status } from '../../const';
import { Camera } from '../../types/camera';

type CamerasSlice = {
  cameras: Camera[];
  status: Status;
}

const initialState: CamerasSlice = {
  cameras: [],
  status: Status.Unsent
};

export const camerasSlice = createSlice({
  name: NameSpace.CamerasData,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCamerasAction.pending, (state) => {
        state.status = Status.Pending;
      })
      .addCase(fetchCamerasAction.fulfilled, (state, action) => {
        state.cameras = action.payload;
        state.status = Status.Success;
      })
      .addCase(fetchCamerasAction.rejected, (state) => {
        state.status = Status.Error;
      });
  }
});

