export const TIMEOUT_SWIPER = 3000;

export const ITEMS_PER_PAGE = 9;
export const CATALOG_PAGE_COUNT = 3;

export const enum AppRoute {
  Main = '/',
  Cameras = '/cameras/',
  //Product = '/cameras/:id/',
  Product = '/cameras/:id/:tab',
  Basket = '/basket',
  NotFound = '/not-found-screen',
  DescriptionTab = 'description',
  SpecificationsTab = 'specifications',
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
  BasketData = 'BASKET_DATA',
  ProductData = 'PRODUCT_DATA',
}

export enum Status {
  Unsent = 'UNSENT',
  Pending = 'PENDING',
  Success = 'SUCCESS',
  Error = 'ERROR',
}
