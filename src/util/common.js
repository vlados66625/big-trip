const getRandomNumber = (min, max, afterCommaNumbers) => {
  if (min >= max) {
    return NaN;
  }
  let randomValue;
  if (afterCommaNumbers === 0) {
    randomValue = min + (max - min + 1) * Math.random();
    return Math.trunc(randomValue);
  }
  randomValue = min + (max - min) * Math.random();
  return Number(randomValue.toFixed(afterCommaNumbers));
};

const getRandomItemArray = (array) => array[getRandomNumber(0, array.length - 1, 0)];

export { getRandomNumber, getRandomItemArray };
