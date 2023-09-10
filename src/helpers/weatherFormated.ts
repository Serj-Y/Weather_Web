import { WeatherFetchDataType } from "../api/weatherApi";
import { formatToLocalTime } from "./../helpers/formatToLocalTime";

interface Hour {
  time_epoch: number;
  temp_c: number;
  condition: {
    icon: string;
  };
}

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
    // Запрещено мутировать данные которые пришли (принцеп чистой функции)
    // -> hoursFromTwoDays

    let { tz_id, forecast, hoursFromTwoDays, location } = this.weather;
    hoursFromTwoDays = forecast?.forecastday.slice(0, 2).map((d) => d.hour);
    const twoDaysHours = hoursFromTwoDays[0].concat(hoursFromTwoDays[1]);
    const filtredTwoDaysHours = twoDaysHours.filter(
      (f: Hour) => f.time_epoch >= location.localtime_epoch
    );
    const hourForecast = filtredTwoDaysHours.map((h: Hour) => {
      return {
        title: formatToLocalTime(h.time_epoch, tz_id, "HH:mm"),
        temp: h.temp_c,
        icon: h.condition.icon,
      };
    });
    const fiveHourForecast = hourForecast.slice(0, 5);

    return { fiveHourForecast };
  }
}
