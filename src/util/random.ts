const getRandInt = (min: number, max: number) => {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
};

export const getRand = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

export const nudge = (currentValue: number) => {
  const min = Math.max(currentValue - 0.1, 0);
  const max = Math.min(currentValue + 0.1, 1);

  const newValue = getRand(min, max);
  return newValue;
};
