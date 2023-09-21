import axios from "axios"


const BASE_URL = "https://api.openweathermap.org/data/2.5/"
const API_KEY = "e99e184c35cf7ecc1463769e65f64115"
const CITY_DEFAULT = "Kyiv"

//https://api.openweathermap.org/data/2.5/weather?q=London&appid=e99e184c35cf7ecc1463769e65f64115

let instance: WeatherApiV2 | undefined;

export class WeatherApiV2 {
    private secretKey: string;
    protected city: string = CITY_DEFAULT;

    constructor() {
        this.secretKey = API_KEY;
        if (!instance) instance = this;
        return this;
    }

    public setCity(city: any) {
        this.city = city;
        return this;
    }

    private getUrlParams(city: any): URLSearchParams {
        return new URLSearchParams({
            ...city,
            appid: this.secretKey,
        });
    }

    public async fetch() {
        try {
            const res = await axios.post(BASE_URL + "weather?" + this.getUrlParams(this.city));

            if (res.status === 200) {
                console.log(res.data, "class")

                return {
                    data: {
                        ...res.data
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



