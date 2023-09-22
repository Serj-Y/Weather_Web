import axios from "axios"
import { WeatherFormatted } from "../helpers/weatherFormattedData";


const BASE_URL = "https://api.openweathermap.org/data/2.5/"
const API_KEY = "e99e184c35cf7ecc1463769e65f64115"
const CITY_DEFAULT = "q=Kyiv"
const UNITS_DEFAULT = "metric"
const LANG_DEFAULT = "en"

//https://api.openweathermap.org/data/2.5/weather?q=London&appid=e99e184c35cf7ecc1463769e65f64115

let instance: WeatherApiV2 | undefined;

export class WeatherApiV2 {
    private secretKey: string;
    protected city: string = CITY_DEFAULT;
    protected units: string = UNITS_DEFAULT ;
    protected lang: string = LANG_DEFAULT ;

    constructor() {
        this.secretKey = API_KEY;
        if (!instance) instance = this;
        return this;
    }

    public setCity(city: any) {
        this.city = city;
        return this;
    }
    public setUnits(units: any) {
        this.units = units;
        return this;
    }
    public setLang(lang: any) {
        this.lang = lang;
        return this;
    }

    private getUrlParams(city: any): URLSearchParams {
        return new URLSearchParams({
            ...city,
            appid: this.secretKey,
            units: this.units ,
            lang: this.lang
        });
    }

    public async fetch() {
        try {
            const res = await axios.post(BASE_URL + "weather?" + this.getUrlParams(this.city));
            const resForecast = await axios.post(BASE_URL + "forecast?" + this.getUrlParams(this.city));

            if (res.status === 200) {
                console.log(res.data, "class")
                const weatherFormat = new WeatherFormatted(res.data);
                const weatherFormatForecast = new WeatherFormatted(resForecast.data);
                return {
                    data: {
                     
                        ...weatherFormat.currentWeather(),
                        ...weatherFormatForecast.forecastWeather(),
                        ...weatherFormatForecast.hourWeather(),
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



