import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Camera } from '../../types/camera';
import { NameSpace, Status } from '../../const';


export type BasketSlice = {
  cameraInBasketModal: Camera | null;
  successModalOpen: boolean;
};

export const initialState: BasketSlice = {
  cameraInBasketModal: null,
  successModalOpen: false,
};

export const basketSlice = createSlice({
  name: NameSpace.BasketData,
  initialState,
  reducers: {
    setCameraInBasketModal: (state, action: PayloadAction<Camera | null>) => {
      state.cameraInBasketModal = action.payload;
    },
    setSuccessModalOpen: (state, action: PayloadAction<boolean>) => {
      state.successModalOpen = action.payload;
    },
  },
  extraReducers(builder) {
    builder
    
  },
});


export const {setCameraInBasketModal, setSuccessModalOpen } = basketSlice.actions;
