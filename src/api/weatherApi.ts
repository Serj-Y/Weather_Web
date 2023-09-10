import axios from "axios";
import { WeatherFormated } from "../helpers/weatherFormated";

const API_KEY = "91bb73b14b5546859b4102417233108";
const BASE_URL = "https://api.weatherapi.com/v1/forecast.json";

const CITY_DEFAULT = "Kyiv";
const DAYS_DEFAULT = "5";

// Тип или тут или в APP - один должен быть
export type WeatherFetchDataType = {
  location: {
    lat: number;
    lon: number;
    name: string;
    country: string;
    tz_id: string;
    localtime_epoch: number;
  };
  forecast: {
    forecastday: Array<{
      hour: number;
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
    }>;
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
  hoursFromTwoDays: any; // Дополнить -> any === vanila js
};

// Singleton (Одиночка)
// Builder (Строитель)
let instance: WeatherApi | undefined;

export class WeatherApi {
  private secretKey: string;

  protected city: string = CITY_DEFAULT;
  protected howDays: string = DAYS_DEFAULT;

  constructor(secretKey?: string) {
    this.secretKey = secretKey || API_KEY;
    if (!instance) instance = this;
    return this;
  }

  public setHowDays(days: number) {
    this.howDays = days.toString();
    return this;
  }

  public setCity(city: string) {
    this.city = city;
    return this;
  }

  private getUrlParams() {
    return new URLSearchParams({
      q: this.city,
      days: this.howDays,
      key: this.secretKey,
    });
  }

  async fetch() {
    try {
      const res = await axios.post(BASE_URL, this.getUrlParams());

      if (res.status === 200) {
        const weatherFormat = new WeatherFormated(res.data);

        return {
          data: {
            ...weatherFormat.currentWeather(),
            ...weatherFormat.forecastWeather(),
            ...weatherFormat.hourWeather(),
          },
          error: null,
        };
      }

      throw new Error("CityNotFound");
      //   return { data: null, error: "Weather not found" };
    } catch (cause) {
      throw new Error("CityNotFound", { cause });
    }
  }
}
