import { error } from "console";
import { STATUS_CODES } from "http";
import { DateTime } from "luxon"


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
        const { hour } = forecastday.map((i: any) => i.day.hour)

        return { lat, lon, name, temp_c, maxtemp_c, mintemp_c, wind_kph, humidity, feelslike_c, country, text, icon, localtime_epoch, tz_id, sunrise, sunset, hour }
    }

}
const formatForecastWeather = (data: any) => {
    if (data.forecast) {
        let { tz_id, forecast, hour } = data;
        forecast = forecast.forecastday.map((d: any) => {

            return {
                title: formatToLocalTime(d.date_epoch, tz_id, "ccc"),
                temp: d.day.maxtemp_c,
                icon: d.day.condition.icon,
                hour: d.hour
            }
        })

        return { tz_id, forecast, hour }
    }
}

const getFormattedWeatherData = async (searchParams: any) => {
    const formattedForecastWeather = await getWeatherData("forecast.json", searchParams).then(formatForecastWeather);
    const formattedCurrentWeather = await getWeatherData("forecast.json", searchParams).then(formatCurrentWeather)

    return { ...formattedCurrentWeather, ...formattedForecastWeather, }
}

const formatToLocalTime = (secs: any, zone: any, format = "cccc, dd LLLL yyyy'| Local time: 'HH:mm") =>
    DateTime.fromSeconds(secs).setZone(zone).toFormat(format)


export default getFormattedWeatherData

export { formatToLocalTime }