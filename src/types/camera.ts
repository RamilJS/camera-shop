
export enum CameraTypes {
  Collectible = 'Коллекционная',
  Instant = 'Моментальная',
  Digital = 'Цифровая',
  Film = 'Плёночная'
}

export enum Category {
  Videocamera = 'Видеокамера',
  Camera = 'Фотоаппарат'
}

export enum Level {
  Null = 'Нулевой',
  Amateur = 'Любительский',
  Professional = 'Профессиональный'
}

export type Camera = {
  id: number;
  name: string;
  vendorCode: string;
  type: CameraTypes;
  category: Category;
  description: string;
  level: Level;
  price: number;
  rating: number;
  reviewCount: number;
  previewImg: string;
  previewImg2x: string;
  previewImgWebp: string;
  previewImgWebp2x: string;
  }
