import { Camera } from '../../types/camera';
import { State } from '../../types/state';
import { Promo } from '../../types/promo';
import { NameSpace, Status } from '../../const';

type Cameras = Camera[];

//массив всех 40 камер для каталога и их статус
export const getCameras = (state: State): Cameras => state[NameSpace.CamerasData].cameras.data;
export const getStatus = (state: State): Status => state[NameSpace.CamerasData].cameras.status;

//массив из 3 камер для банера и статус
export const getPromo = (state: State): Promo[] | null => state[NameSpace.CamerasData].promoCamera.data;
export const getPromoStatus = (state: State): Status => state[NameSpace.CamerasData].promoCamera.status;

//одна камера - товар и ее статус
export const getCameraProduct = (state: State) => state[NameSpace.CamerasData].camera.product as Camera;
export const getCameraProductStatus = (state: State): boolean => state[NameSpace.CamerasData].camera.isLoading;

//массив из похожих камер для страницы продукта и их статус
export const getSimilarCameras = (state: State): Cameras => state[NameSpace.CamerasData].camera.similarCameras;
export const getSimilarCamerasStatus = (state: State): boolean => state[NameSpace.CamerasData].camera.isSimilarLoading;

export const getModalBuyStatus = (state: State) : boolean => state[NameSpace.CamerasData].camera.isModalBuy;
