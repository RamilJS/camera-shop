import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { createAPI } from '../services/api';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../types/state';
import {
  fetchCamerasAction,
  fetchCameraAction,
  fetchPromoAction,
  fetchSimilarCamerasAction,
  fetchPostReviewsAction,
  fetchReviewsAction,
} from './api-actions';
import { makeFakeCamera, makeFakePromoCamera, makeFakeReview } from '../utils-test/mocks';
import { PostReview } from '../types/reviews';
import { APIRoute } from '../const';

const mockCameras = [makeFakeCamera(), makeFakeCamera()];
const mockCamera = makeFakeCamera();
const mockPromoCamera = makeFakePromoCamera();
const mockReviews = [makeFakeReview(), makeFakeReview()];

describe('Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStore = configureMockStore<
      State,
      Action<string>,
      ThunkDispatch<State, typeof axios, Action>
    >(middleware);

  describe('get fetchCameraAction', () => {
    it('should dispatch Camera when GET /cameras/:id', async () => {

      mockAxiosAdapter
        .onGet(`${APIRoute.Cameras}/${mockCamera.id}`)
        .reply(200, mockCamera);

      const store = mockStore();

      await store.dispatch(fetchCameraAction(mockCamera.id));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        fetchCameraAction.pending.type,
        fetchCameraAction.fulfilled.type,
      ]);
    });
  });

  describe('get fetchCamerasAction', () => {
    it('should dispatch Cameras when GET /cameras', async () => {
      mockAxiosAdapter
        .onGet(APIRoute.Cameras)
        .reply(200, mockCameras);

      const store = mockStore();

      await store.dispatch(fetchCamerasAction());

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        fetchCamerasAction.pending.type,
        fetchCamerasAction.fulfilled.type,
      ]);
    });
  });

  describe('get fetchPromoAction', () => {
    it('should dispatch PromoCamera when GET /promo', async () => {

      mockAxiosAdapter
        .onGet(APIRoute.Promo)
        .reply(200, mockPromoCamera);

      const store = mockStore();

      await store.dispatch(fetchPromoAction());

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        fetchPromoAction.pending.type,
        fetchPromoAction.fulfilled.type
      ]);
    });
  });

  describe('get fetchSimilarCamerasAction', () => {
    it('should dispatch SimilarCameras when GET /favorite', async () => {

      mockAxiosAdapter
        .onGet(`${APIRoute.Cameras}/${mockCamera.id}/${APIRoute.SimilarCameras}`)
        .reply(200, mockCameras);

      const store = mockStore();

      await store.dispatch(fetchSimilarCamerasAction(mockCamera.id));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        fetchSimilarCamerasAction.pending.type,
        fetchSimilarCamerasAction.fulfilled.type,
      ]);
    });

  });

  describe('get fetchReviewsAction', () => {
    it('should dispatch Reviews when GET /cameras/:id/reviews', async () => {

      mockAxiosAdapter
        .onGet(`${APIRoute.Cameras}/${mockCamera.id}/${APIRoute.Reviews}`)
        .reply(200, mockReviews);

      const store = mockStore();

      await store.dispatch(fetchReviewsAction(mockCamera.id));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        fetchReviewsAction.pending.type,
        fetchReviewsAction.fulfilled.type
      ]);
    });
  });

  describe('post fetchPostReviewsAction', () => {
    it('should dispatch Review and fetch reviews when POST /reviews', async () => {
      const fakeReview: PostReview = {
        cameraId: 3,
        userName: 'test name',
        advantage: 'test advantage',
        disadvantage: 'test disadvantage',
        review: 'test comment',
        rating: 7,
      };

      mockAxiosAdapter
        .onPost(APIRoute.PostReview)
        .reply(200);

      const store = mockStore();

      await store.dispatch(fetchPostReviewsAction(fakeReview));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        fetchPostReviewsAction.pending.type,
        fetchReviewsAction.pending.type,
        fetchPostReviewsAction.fulfilled.type
      ]);
    });
  });
});
