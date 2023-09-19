// import { WeatherType } from "../App";

export const getBackgroundColor = (weather: any): string => {
  if (weather?.forecast) {
    const { temp } = weather.temp_c;
    if (!weather) return "from-cyan-500 to-blue-500";
    if (temp <= 15) return "from-cyan-600 to-blue-600";
    if (temp >= 30) return "from-yellow-500 to-orange-500";
    return "from-cyan-500 to-blue-500";
  }
  return "from-cyan-500 to-blue-500";
};
