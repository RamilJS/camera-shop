export const enum AppRoute {
  Main = '/',
  Product = '/cameras/:id',
  Basket = '/basket',
  NotFound = '/not-found-screen',
  ProductDescriptionTab = 'description',
}

export enum APIRoute {
  Cameras = '/cameras',
  SimilarCameras = 'similar',
  Reviews = 'reviews',
  ReviewPost = '/reviews',
  Promo = '/promo',
  Coupons = '/coupons',
  OrdersPost = '/orders',
}

export enum NameSpace {
  CamerasData = 'CAMERAS_DATA',
}

export enum Status {
  Unsent = 'UNSENT',
  Pending = 'PENDING',
  Success = 'SUCCESS',
  Error = 'ERROR',
}
