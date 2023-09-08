import { formatToLocalTime } from "../components/common/formatToLocalTime";
import { error } from "console";


const API_KEY = "91bb73b14b5546859b4102417233108"
const BASE_URL = "http://api.weatherapi.com/v1/"
//http://api.weatherapi.com/v1/current.json?key= 91bb73b14b5546859b4102417233108&q=Kiev&aqi=no
// Call Current in city Kiev

 type DataType = {
    location: {
        lat: number,
        lon: number,
        name: string,
        country: string,
        tz_id: string,
        localtime_epoch: number
    },
    forecast: {
        forecastday: Array<{
            hour: number;
            date_epoch: number;
            day: {
                mintemp_c: number,
                maxtemp_c: number,
                condition: {
                    icon: string
                }
            },
            astro: {
                sunrise: string,
                sunset: string
            }
        }>,

    },
    current: {
        temp_c: number,
        wind_kph: number,
        humidity: number,
        feelslike_c: number,
        condition: {
            text: string,
            icon: string
        }
    },
    tz_id: string
    hoursFromTwoDays: any
}

const getWeatherData = (infoType: string, searchParams: string) => {
    const url = new URL(BASE_URL + infoType);
    
    url.search = new URLSearchParams({ q: searchParams, days: 5, key: API_KEY }as any) as any
    return fetch(url).then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error(`Something went wrong on API server! ${response.statusText}`);
      }
    })
    .then((response) => {
        return response
    })
    .catch((error) => {
        console.log(error)
    });
}

const formatCurrentWeather = (data: DataType) => {
    if (data) {
        const {
            location: { lat, lon, name, country, tz_id, localtime_epoch },
            current: { temp_c, wind_kph, humidity, feelslike_c, condition: { text, icon } },
            forecast: { forecastday, }
        } = data
        const { maxtemp_c, mintemp_c } = forecastday[0].day
        const { sunrise, sunset } = forecastday[0].astro
        return {
            lat, lon, name,
            temp_c, maxtemp_c, mintemp_c,
            wind_kph, humidity, feelslike_c,
            country, text, icon, localtime_epoch,
            tz_id, sunrise, sunset,
        }
    }
}

const formatForecastWeather = (data: { tz_id: string, forecast: { forecastday: any } }) => {
    if (data) {
        let { tz_id, forecast } = data;
        forecast = forecast.forecastday.map((d: { day: { maxtemp_c: number, condition: { icon: string } }, date_epoch: number }) => {
            return {
                title: formatToLocalTime(d.date_epoch, tz_id, "ccc"),
                temp: d.day.maxtemp_c,
                icon: d.day.condition.icon,
            }
        })
        return { forecast }
    }
}

const formatHourWeather = (data: DataType) => {
    if (data) {
        let { tz_id, forecast, hoursFromTwoDays, location } = data
        hoursFromTwoDays = forecast?.forecastday.slice(0, 2).map((d) => d.hour);
        const twoDaysHours = hoursFromTwoDays[0].concat(hoursFromTwoDays[1]);
        const filtredTwoDaysHours = twoDaysHours.filter((f: { time_epoch: number; }) => f.time_epoch >= location.localtime_epoch)
        const hourForecast = filtredTwoDaysHours.map((h: { time_epoch: number, temp_c: number, condition: { icon: string } }) => {
            return {
                title: formatToLocalTime(h.time_epoch, tz_id, "HH:mm"),
                temp: h.temp_c,
                icon: h.condition.icon,
            }
        })
        const fiveHourForecast = hourForecast.slice(0, 5)

        return { fiveHourForecast }
    }
}

const getFormattedWeatherData = async (searchParams: string) => {
    const formattedForecastWeather = await getWeatherData("forecast.json", searchParams).then(formatForecastWeather);
    const formattedCurrentWeather = await getWeatherData("forecast.json", searchParams).then(formatCurrentWeather)
    const formattedHourWeather = await getWeatherData("forecast.json", searchParams).then(formatHourWeather)

    return { ...formattedCurrentWeather, ...formattedHourWeather, ...formattedForecastWeather  }
}

export default getFormattedWeatherData

export { formatToLocalTime }