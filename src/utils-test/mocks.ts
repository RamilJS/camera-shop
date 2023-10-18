import { datatype, random, name, system, date, image, } from 'faker';
import { Camera } from '../types/camera';
import { Promo } from '../types/promo';
import { Review } from '../types/reviews';

export const makeFakeCamera = (): Camera => ({
  id: datatype.number(),
  name: random.word(),
  vendorCode: random.word(),
  type: random.word(),
  category: random.word(),
  description: random.words(),
  level: random.word(),
  price: datatype.number(),
  reviewCount: datatype.number(),
  rating: datatype.number(),
  previewImg: system.filePath(),
  previewImg2x: system.filePath(),
  previewImgWebp: system.filePath(),
  previewImgWebp2x: system.filePath(),
  count: 1,
} as Camera);

export const makeFakePromoCamera = (): Promo => ({
  id: datatype.number(),
  name: random.word(),
  previewImg: system.filePath(),
  previewImg2x: system.filePath(),
  previewImgWebp: system.filePath(),
  previewImgWebp2x: system.filePath(),
} as Promo);

export const makeFakePromos = () : Promo[] => (
  new Array(3).fill(null).map(() => (
    {
      id: datatype.number(),
      name: name.firstName(),
      previewImg: image.imageUrl(),
      previewImg2x: image.imageUrl(),
      previewImgWebp: image.imageUrl(),
      previewImgWebp2x: image.imageUrl(),
    }
  ))
);

export const makeFakeReview = (): Review => ({
  id: datatype.uuid(),
  createAt: String(date.recent()),
  cameraId: datatype.number(),
  userName: name.findName(),
  advantage: random.words(),
  disadvantage: random.words(),
  review: random.words(),
  rating: datatype.number(),
} as Review);


