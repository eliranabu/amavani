const ils = new Intl.NumberFormat("he-IL", {
  style: "currency",
  currency: "ILS",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

export const formatPrice = (n: number) => ils.format(n);

export const discountPercent = (price: number, compareAt?: number) =>
  compareAt && compareAt > price ? Math.round((1 - price / compareAt) * 100) : 0;
