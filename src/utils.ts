const PriceFormatOptions = {
  style: 'currency',
  currency: 'RUB',
  minimumFractionDigits: 0
} as const;

export const formatPrice = (price: number) => price.toLocaleString('ru-RU', PriceFormatOptions);

const DateFormatOptions = {
  day: 'numeric',
  month: 'long'
} as const;

export const formatDate = (date: string) => new Date(date).toLocaleString('ru-RU', DateFormatOptions);
