import { createAsyncThunk } from '@reduxjs/toolkit';
import { Camera } from '../types/camera';
import { ThunkOptions } from '../types/state';
import { APIRoute } from '../const';
import { Promo } from '../types/promo';

type Cameras = Camera[];

export const fetchCamerasAction = createAsyncThunk<Cameras, undefined, ThunkOptions>(
  'data/fetchCameras',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Cameras>(APIRoute.Cameras);
    return data;
  }
);

export const fetchCameraAction = createAsyncThunk<Camera, number, ThunkOptions>(
  'data/fetchCamera',
  async (cameraId, {extra: api}) => {
    const {data: camera} = await api.get<Camera>(`${APIRoute.Cameras}/${cameraId}`);
    return camera;
  }
);

export const fetchPromoAction = createAsyncThunk<Promo[], undefined, ThunkOptions>(
  'data/fetchPromo',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Promo[]>(APIRoute.Promo);
    return data;
  }
);

