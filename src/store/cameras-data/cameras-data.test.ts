import {
  fetchCameraAction,
  fetchCamerasAction,
  fetchPromoAction,
  fetchSimilarCamerasAction,
} from '../api-actions';
import { makeFakeCamera, makeFakePromoCamera } from '../../utils-test/mocks';
import { camerasSlice, initialState } from './cameras-data';
import { Status } from '../../const';

const mockCameras = [makeFakeCamera(), makeFakeCamera()];
const mockCamera = makeFakeCamera();
const mockPromoCamera = makeFakePromoCamera();

describe('CameraSlice', () => {

  it('without additional parameters should return initial state', () => {
    expect(camerasSlice.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({...initialState});
  });

  describe('cameras test', () => {
    it('should set cameras.status Pending', () => {
      expect(
        camerasSlice.reducer({...initialState}, {type: fetchCamerasAction.pending.type})
      ).toEqual({
        ...initialState,
        cameras: {
          ...initialState.cameras,
          status: Status.Pending,
        }
      });
    });

    it('should update cameras', () => {
      expect(camerasSlice.reducer({...initialState}, {type: fetchCamerasAction.fulfilled.type, payload: mockCameras}))
        .toEqual({
          ...initialState,
          cameras: {
            ...initialState.cameras,
            data: mockCameras,
            status: Status.Success
          }
        });
    });
  });

  describe('camera test', () => {
    it('should set camera.isLoading to true on fetchCameraByIdAction.pending', () => {
      expect(
        camerasSlice.reducer({...initialState}, {type: fetchCameraAction.pending.type})
      ).toEqual({
        ...initialState,
        camera: {
          ...initialState.camera,
          isLoading: true
        }
      });
    });

    it('should update camera by load camera + set camera.loading to false', () => {
      expect(camerasSlice.reducer({...initialState}, {type: fetchCameraAction.fulfilled.type, payload: mockCamera}))
        .toEqual({
          ...initialState,
          camera: {
            ...initialState.camera,
            product: mockCamera,
            isLoading: false
          }
        });
    });

  });

  describe('similarCameras test', () => {
    it('should set camera.similarCameras.isSimilarLoading to true on fetchSimilarCamerasAction.pending', () => {
      expect(
        camerasSlice.reducer({...initialState}, {type: fetchSimilarCamerasAction.pending.type})
      ).toEqual({
        ...initialState,
        camera: {
          ...initialState.camera,
          isSimilarLoading: true
        }
      });
    });

    it('should update camera.similarCameras by load similar cameras + set camera.isSimilarLoading to false', () => {
      expect(camerasSlice.reducer({...initialState}, {type: fetchSimilarCamerasAction.fulfilled.type, payload: mockCameras}))
        .toEqual({
          ...initialState,
          camera: {
            ...initialState.camera,
            similarCameras: mockCameras,
            isSimilarLoading: false
          }
        });
    });

    it('should set camera.isSimilarLoading to false on fetchSimilarCamerasAction.rejected', () => {
      expect(camerasSlice.reducer({...initialState}, {type: fetchSimilarCamerasAction.rejected.type}))
        .toEqual({
          ...initialState,
          camera: {
            ...initialState.camera,
            isSimilarLoading: false
          }
        });
    });

  });

  describe('promoCamera test', () => {
    it('should set promoCamera status Pending on fetchPromoAction.pending', () => {
      expect(
        camerasSlice.reducer({...initialState}, {type: fetchPromoAction.pending.type})
      ).toEqual({
        ...initialState,
        promoCamera: {
          ...initialState.promoCamera,
          status: Status.Pending
        }
      });
    });

    it('should update promoCamera by load promo camera + set promoCamera status to success', () => {
      expect(camerasSlice.reducer({...initialState}, {type: fetchPromoAction.fulfilled.type, payload: mockPromoCamera}))
        .toEqual({
          ...initialState,
          promoCamera: {
            ...initialState.promoCamera,
            data: mockPromoCamera,
            status: Status.Success
          }
        });
    });

    it('should set promoCamera status to error on fetchPromoAction.rejected', () => {
      expect(camerasSlice.reducer({...initialState}, {type: fetchPromoAction.rejected.type}))
        .toEqual({
          ...initialState,
          promoCamera: {
            ...initialState.promoCamera,
            status: Status.Error
          }
        });
    });

  });

});

