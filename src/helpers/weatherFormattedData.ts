
import { formatToLocalTime } from "./../helpers/formatToLocalTime";


export class WeatherFormatted {
    private weather: any;

    constructor(weather: any) {
        this.weather = weather;
    }

    public currentWeather() {
        const { lat, lon } = this.weather.coord
        const { temp, feels_like, temp_min, temp_max, humidity } = this.weather.main
        const { country, sunrise, sunset } = this.weather.sys
        const { dt, timezone, id, name } = this.weather
        const { description, icon } = this.weather.weather[0]
        const { speed } = this.weather.wind
        return {
            lat,
            lon,
            name,
            temp,
            feels_like,
            temp_min,
            temp_max,
            humidity,
            country,
            sunrise,
            sunset,
            dt,
            timezone,
            id,
            description,
            icon,
           wind_mph: speed


        };
    }

    public forecastWeather() {
     const {list} = this.weather
    
        console.log(this.weather, "forecastWeather")
        const fiveDay = list.map(({ dt, id, main:{temp}, weather }: any) => ({
            title: formatToLocalTime(dt, id, "dd:mm"),
              temp: temp,
              icon: weather[0].icon
            }))
        return { fiveDayForecast: fiveDay.filter((f: any) => parseInt(f.title) > parseInt(f.title[1]) ) };


    }

    public hourWeather() {
        const {list} = this.weather
        const fiveHour = list.slice(0,5).map(({ dt, id, main:{temp}, weather }: any) => ({
               title: formatToLocalTime(dt, id, "HH:mm"),
                 temp: temp,
                 icon: weather[0].icon
               }))

        return { fiveHourForecast: fiveHour };
    }
}