import axios from "axios";
import { WeatherFormattedData } from "../../utils/weatherFormattedData";

const API_KEY = "91bb73b14b5546859b4102417233108";
const BASE_URL = "https://api.weatherapi.com/v1/forecast.json?";
const CITY_DEFAULT = "Kyiv";
const LANG_DEFAULT = "en";

let instance: WeatherApi | undefined;

export class WeatherApi {
  private secretKey: string;
  protected city: string = CITY_DEFAULT;
  protected lang: string = LANG_DEFAULT;
  protected key: string = API_KEY;

  constructor() {
    this.secretKey = API_KEY;
    if (!instance) instance = this;
    return this;
  }

  public setCity(city: string) {
    this.city = city;
    return this;
  }

  public setLang(lang: string) {
    this.lang = lang;
    return this;
  }

  private getUrlParams(): URLSearchParams {
    return new URLSearchParams({
      q: this.city,
      days: "5",
      lang: this.lang,
      key: this.secretKey,
    });
  }

  public async fetch() {
    try {
      const res = await axios.get(BASE_URL + this.getUrlParams());
      if (res.status === 200) {
        const weatherFormat = new WeatherFormattedData(res.data);
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
    } catch (cause) {
      throw new Error("CityNotFound", { cause });
    }
  }
}
