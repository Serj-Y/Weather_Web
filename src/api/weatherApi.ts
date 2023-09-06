import { formatToLocalTime } from "../components/common/formatToLocalTime";


const API_KEY = "91bb73b14b5546859b4102417233108"
const BASE_URL = "http://api.weatherapi.com/v1/"
//http://api.weatherapi.com/v1/current.json?key= 91bb73b14b5546859b4102417233108&q=Kiev&aqi=no
// Call Current in city Kiev

const getWeatherData = (infoType: any, searchParams: any) => {
    const url = new URL(BASE_URL + infoType);
    //@ts-ignore
    url.search = new URLSearchParams({ q: searchParams, days: 5, key: API_KEY })
    return fetch(url).then((response) => response.json()).catch((error) => alert(error))
}

const formatCurrentWeather = (data: any) => {
    if (data.forecast) {
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

const formatForecastWeather = (data: any) => {
    if (data.forecast) {
        let { tz_id, forecast } = data;
        forecast = forecast.forecastday.map((d: any) => {
            return {
                title: formatToLocalTime(d.date_epoch, tz_id, "ccc"),
                temp: d.day.maxtemp_c,
                icon: d.day.condition.icon,
            }
        })

        return { tz_id, forecast }
    }
}

const formatHourWeather = (data: any) => {
    if (data.forecast) {
        let { tz_id, forecast, hoursFromTwoDays, location } = data
        hoursFromTwoDays = forecast?.forecastday.slice(0, 2).map((d: any) => d.hour);
        const twoDaysHours = hoursFromTwoDays[0].concat(hoursFromTwoDays[1]);
        const filtredTwoDaysHours = twoDaysHours.filter((f: any) => f.time_epoch >= location.localtime_epoch)
        const hourForecast = filtredTwoDaysHours.map((h: any) => {
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

const getFormattedWeatherData = async (searchParams: any) => {
    const formattedForecastWeather = await getWeatherData("forecast.json", searchParams).then(formatForecastWeather);
    const formattedCurrentWeather = await getWeatherData("forecast.json", searchParams).then(formatCurrentWeather)
    const formattedHourWeather = await getWeatherData("forecast.json", searchParams).then(formatHourWeather)

    return { ...formattedCurrentWeather, ...formattedForecastWeather, ...formattedHourWeather }
}

export default getFormattedWeatherData

export { formatToLocalTime }