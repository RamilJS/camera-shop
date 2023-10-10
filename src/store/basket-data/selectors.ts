import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { Camera } from '../../types/camera';

export const getBasketSuccessModalStatus = (state: State): boolean => state[NameSpace.BasketData].successModalOpen;
export const getCameraInBasketModal = (state: State): Camera => state[NameSpace.BasketData].cameraInBasketModal as Camera;

