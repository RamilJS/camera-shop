import { Camera } from '../../types/camera';
import { State } from '../../types/state';
import { NameSpace, Status } from '../../const';

type Cameras = Camera[];

export const getCameras = (state: State): Cameras => state[NameSpace.CamerasData].cameras;
export const getStatus = (state: State): Status => state[NameSpace.CamerasData].status;

