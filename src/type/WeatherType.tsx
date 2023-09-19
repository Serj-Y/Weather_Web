

export type WeatherType = {
  fiveHourForecast: { title: string; icon: string; temp: number; }[];
  dailyForecast: { title: string; icon: string; temp: number; }[];
  country: string;
  feelslike_c: number;
  humidity: number;
  icon: string;
  lat: number;
  localtime_epoch: number;
  lon: number;
  maxtemp_c: number;
  mintemp_c: number;
  name: string;
  sunrise: string;
  sunset: string;
  temp_c: number;
  text: string;
  tz_id: string;
  wind_kph: number;
};
