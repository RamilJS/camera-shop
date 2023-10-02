import { createSlice } from '@reduxjs/toolkit';
import { fetchPromoAction } from '../api-actions';
import { Promo } from '../../types/promo';
import { NameSpace, Status } from '../../const';

type PromoSlice = {
  promo: Promo | null;
  status: Status;
}

const initialState: PromoSlice = {
  promo: null,
  status: Status.Unsent
};

export const promoSlice = createSlice({
  name: NameSpace.CamerasData,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPromoAction.pending, (state) => {
        state.status = Status.Pending;
      })
      .addCase(fetchPromoAction.fulfilled, (state, action) => {
        state.promo = action.payload;
        state.status = Status.Success;
      })
      .addCase(fetchPromoAction.rejected, (state) => {
        state.status = Status.Error;
      });
  }
});
