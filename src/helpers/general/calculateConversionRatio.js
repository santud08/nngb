export const calculateConversionRatio = (from, to) => {
  const gcd = (from, to) => (to === 0 ? from : gcd(to, from % to));
  const commonFactor = gcd(from, to);
  return `${from / commonFactor}:${to / commonFactor}`;
};
