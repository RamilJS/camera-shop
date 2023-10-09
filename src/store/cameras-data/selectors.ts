import { Camera } from '../../types/camera';
import { State } from '../../types/state';
import { Promo } from '../../types/promo';
import { NameSpace, Status } from '../../const';

type Cameras = Camera[];

export const getCameras = (state: State): Cameras => state[NameSpace.CamerasData].cameras.data;
export const getStatus = (state: State): Status => state[NameSpace.CamerasData].cameras.status;

export const getPromo = (state: State): Promo[] | null => state[NameSpace.CamerasData].promoCamera.data;
export const getPromoStatus = (state: State): Status => state[NameSpace.CamerasData].promoCamera.status;

export const getSelectedProduct = (state: State) => state[NameSpace.CamerasData].camera.product as Camera;
export const getSelectedProductStatus = (state: State): Status => state[NameSpace.CamerasData].camera.loadingStatus;

export const getCartSuccessModalStatus = (state: State): boolean => state[NameSpace.CamerasData].camera.successModalOpen;
