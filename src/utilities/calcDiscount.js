export default function calcDiscountByLocale(sell, origin) {
  const bargain = (sell / origin) * 100;
  return {
    en: Math.floor(100 - bargain),
    zh:
      Math.ceil(bargain) % 10 === 0
        ? Math.ceil(bargain) / 10
        : Math.ceil(bargain),
  };
}
