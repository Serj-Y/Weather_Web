import { WeatherFetchDataType } from "../api/weatherApi";
import { formatToLocalTime } from "./../helpers/formatToLocalTime";

export class WeatherFormated {
  private weather: WeatherFetchDataType;

  constructor(weather: WeatherFetchDataType) {
    this.weather = weather;
  }

  public currentWeather() {
    const { location, current, forecast } = this.weather;
    const { lat, lon, name, country, tz_id, localtime_epoch } = location;
    const { temp_c, wind_kph, humidity, feelslike_c, condition } = current;
    const { text, icon } = condition;
    const { forecastday } = forecast;
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

  public forecastWeather() {
    let { tz_id, forecast } = this.weather;
    const formated = forecast.forecastday.map(
      (d: {
        day: { maxtemp_c: number; condition: { icon: string } };
        date_epoch: number;
      }) => {
        return {
          title: formatToLocalTime(d.date_epoch, tz_id, "dd.MM "),
          temp: d.day.maxtemp_c,
          icon: d.day.condition.icon,
        };
      }
    );
    return { forecast: formated };
  }

  public hourWeather() {
    let { forecast, location } = this.weather;
    const twoDaysHours = forecast.forecastday.flatMap((d) => d.hour);

    const filtredTwoDaysHours = twoDaysHours.filter(
      (f) => f.time_epoch >= location.localtime_epoch
    );

    const hourForecast = filtredTwoDaysHours
      .slice(0, 5)
      .map(({ time_epoch, temp_c, condition: { icon } }) => ({
        title: formatToLocalTime(time_epoch, location.tz_id, "HH:mm"),
        temp: temp_c,
        icon,
      }));
    return { fiveHourForecast: hourForecast };
  }
}
