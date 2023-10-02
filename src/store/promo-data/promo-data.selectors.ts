import { State } from '../../types/state';
import { Promo } from '../../types/promo';
import { NameSpace, Status } from '../../const';

export const getPromo = (state: State): Promo | null => state[NameSpace.PromoData].promo;
export const getPromoStatus = (state: State): Status => state[NameSpace.PromoData].status;
