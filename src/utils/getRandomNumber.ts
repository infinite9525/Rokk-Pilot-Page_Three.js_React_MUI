export const getRandomNumber = (min: number, max: number) => {
  const random: number = Math.random() * (max - min) + min;
  // return random < -0.5
  //   ? random
  //   : random < 0
  //   ? random - 0.5
  //   : random < 0.5
  //   ? random + 0.5
  //   : random;
  return random;
};
