
export const celsiusToFahrenheit = (
  celsius: number,
  isFahrenheit: boolean
): string => {
  if (isFahrenheit) {
    const tempF = celsius * (9 / 5) + 32;
    return tempF.toFixed();
  }

  const tempC = celsius;
  return tempC.toFixed();
};
