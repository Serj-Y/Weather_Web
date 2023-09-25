import { WeatherDataType } from "../types/Types";
import { formatToLocalTime } from "./helpers";

export type WeatherType = CurrentWeatherType &
  DailyForecastType &
  FiveHourForecastType; 

export type CurrentWeatherType = {
  lat: number;
  lon: number;
  name: string;
  temp_c: number;
  maxtemp_c: number;
  mintemp_c: number;
  wind_kph: number;
  humidity: number;
  feelslike_c: number;
  country: string;
  text: string;
  icon: string;
  localtime_epoch: number;
  tz_id: string;
  sunrise: string;
  sunset: string;
};

export type DailyForecastType = {
  dailyForecast: {
    title: string;
    temp: number;
    icon: string;
  }[];
};

export type FiveHourForecastType = {
  fiveHourForecast: {
    title: string;
    temp: number;
    icon: string;
  }[];
};

export class WeatherFormattedData {
  private weather: WeatherDataType;

  constructor(weather: WeatherDataType) {
    this.weather = weather;
  }

  public currentWeather(): CurrentWeatherType {
    const { lat, lon, name, country, tz_id, localtime_epoch } =
      this.weather.location;
    const {
      temp_c,
      wind_kph,
      humidity,
      feelslike_c,
      condition: { text, icon },
    } = this.weather.current;
    const { forecastday } = this.weather.forecast;
    const { maxtemp_c, mintemp_c } = forecastday[0].day;
    const { sunrise, sunset } = forecastday[0].astro;
    return {
      lat,
      lon,
      name,
      temp_c,
      maxtemp_c,
      mintemp_c,
      wind_kph,
      humidity,
      feelslike_c,
      country,
      text,
      icon,
      localtime_epoch,
      tz_id,
      sunrise,
      sunset,
    };
  }

  public forecastWeather(): DailyForecastType {
    let { tz_id, forecast } = this.weather;
    const formatted = forecast.forecastday.map((d) => {
      return {
        title: formatToLocalTime(d.date_epoch, tz_id, "dd.MM "),
        temp: d.day.maxtemp_c,
        icon: d.day.condition.icon,
      };
    });
    return { dailyForecast: formatted };
  }
  public hourWeather(): FiveHourForecastType {
    let { forecast, location } = this.weather;
    const twoDaysHours = forecast.forecastday.flatMap((d) => d.hour);

    const filtredTwoDaysHours = twoDaysHours.filter(
      (f) => f.time_epoch >= location.localtime_epoch
    );

    const hourForecast = filtredTwoDaysHours
      .slice(0, 5)
      .map(({ time_epoch, temp_c, condition: { icon } }) => ({
        title: formatToLocalTime(time_epoch, location.tz_id, "hh:mm a"),
        temp: temp_c,
        icon,
      }));
    return { fiveHourForecast: hourForecast };
  }
}
