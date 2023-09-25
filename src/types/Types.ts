export type WeatherForecastHourType = {
  time: Date;
  temp_c: number;
  time_epoch: number;
  condition: { icon: string };
};

export type WeatherForecastDayType = {
  hour: Array<WeatherForecastHourType>;
  date_epoch: number;
  day: {
    mintemp_c: number;
    maxtemp_c: number;
    condition: {
      icon: string;
    };
  };
  astro: {
    sunrise: string;
    sunset: string;
  };
};

export type WeatherDataType = {
  location: {
    lat: number;
    lon: number;
    name: string;
    country: string;
    tz_id: string;
    localtime_epoch: number;
  };
  forecast: {
    forecastday: Array<WeatherForecastDayType>;
  };
  current: {
    temp_c: number;
    wind_kph: number;
    humidity: number;
    feelslike_c: number;
    condition: {
      text: string;
      icon: string;
    };
  };
  tz_id: string;
  isFahrenheit: boolean;
};
