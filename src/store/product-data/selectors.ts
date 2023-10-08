
import { Camera } from '../../types/camera';
import { State } from '../../types/state';
import { NameSpace, Status } from '../../const';

export const getSelectedProduct = (state: State): Camera | null => state[NameSpace.ProductData].product;
export const getSelectedProductStatus = (state: State): Status => state[NameSpace.ProductData].loadingStatus;
