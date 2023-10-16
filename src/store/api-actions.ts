import { createAsyncThunk } from '@reduxjs/toolkit';
import { Camera } from '../types/camera';
import { Reviews, Review, PostReview } from '../types/reviews';
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

export const fetchSimilarCamerasAction = createAsyncThunk<Cameras, number, ThunkOptions>(
  'data/fetchSimilarCameras',
  async (cameraId, { extra: api}) => {
    const {data: cameras} = await api.get<Cameras>(`${APIRoute.Cameras}/${cameraId}/similar`);
    return cameras;
  }
);

export const fetchPromoAction = createAsyncThunk<Promo[], undefined, ThunkOptions>(
  'data/fetchPromo',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Promo[]>(APIRoute.Promo);
    return data;
  }
);

export const fetchReviewsAction = createAsyncThunk<Reviews, number, ThunkOptions>(
  'data/fetchReviews',
  async (cameraId, {extra: api}) => {
    const {data} = await api.get<Reviews>(`${APIRoute.Cameras}/${cameraId}/${APIRoute.Reviews}`);
    return data;
  }
);

export const fetchPostReviewsAction = createAsyncThunk<Review, PostReview, ThunkOptions>(
  'data/fetchPostReviews',
  async ({cameraId, userName, advantage, disadvantage, review, rating}, {dispatch, extra: api}) => {
    const {data} = await api.post<Review>(APIRoute.PostReview, {cameraId, userName, advantage, disadvantage, review, rating});
    dispatch(fetchReviewsAction(cameraId));
    return data;
  }
);
