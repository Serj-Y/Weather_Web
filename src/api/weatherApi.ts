import { WeatherType } from "../type/WeatherType";
import { formatToLocalTime } from "../helpers/formatToLocalTime";
import { DataType } from "../type/DataType";
import { DateTime } from "luxon";


const API_KEY = "91bb73b14b5546859b4102417233108"
const BASE_URL = "https://api.weatherapi.com/v1/"


const getWeatherData = (infoType: any, searchParams: any) => {
    const url = new URL(BASE_URL + infoType);

    url.search = new URLSearchParams({ ...searchParams, days: 5, key: API_KEY } as any) as any
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

const formatForecastWeather = (data: DataType) => {
    if (data) {
        const { location, forecast } = data;
        const dailyForecast = forecast?.forecastday.map((d) => {
            return {
                title: formatToLocalTime(d.date_epoch, location.tz_id, "dd.MM "),
                temp: d.day.maxtemp_c,
                icon: d.day.condition.icon,
            }
        })
        return { dailyForecast }
    }
}

const formatHourWeather = (data: DataType) => {
    if (data) {
        const { forecast, location } = data
        const hoursFromTwoDays = forecast?.forecastday.slice(0, 2).map((d) => d.hour);
        const twoDaysHours = hoursFromTwoDays[0].concat(hoursFromTwoDays[1]);
        const filtredTwoDaysHours = twoDaysHours.filter((f) => f.time_epoch >= location.localtime_epoch)
        const hourForecast = filtredTwoDaysHours.map((h) => {
            const time24 = h.time.slice(-5).toString()
            return {
                title: DateTime.fromFormat(time24, "HH:mm").toFormat("hh:mm a"),
                temp: h.temp_c,
                icon: h.condition.icon,
            }
        })
        const fiveHourForecast = hourForecast.slice(0, 5)

        return { fiveHourForecast }
    }
}

const getFormattedWeatherData = async (searchParams: any) => {
    const formattedForecastWeather = await getWeatherData("forecast.json", searchParams).then(formatForecastWeather)
    const formattedCurrentWeather = await getWeatherData("forecast.json", searchParams).then(formatCurrentWeather)
    const formattedHourWeather = await getWeatherData("forecast.json", searchParams).then(formatHourWeather)

    return { ...formattedCurrentWeather, ...formattedHourWeather, ...formattedForecastWeather } as unknown as WeatherType
}
export default getFormattedWeatherData

