export const getGradientPositionClass = (weather: any): string => {
  if (weather?.forecast) {
    const time = weather?.fiveHourForecast[0].title;
    if (time < "12:00") return "bg-gradient-to-br";
    if (time > "16:00") return "bg-gradient-to-bl";
    return "bg-gradient-to-b";
  }
  return "bg-gradient-to-b";
};
