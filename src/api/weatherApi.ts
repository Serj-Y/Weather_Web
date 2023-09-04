import { DateTime } from "luxon"

const API_KEY = "91bb73b14b5546859b4102417233108"
const BASE_URL = "http://api.weatherapi.com/v1/"

//http://api.weatherapi.com/v1/current.json?key= 91bb73b14b5546859b4102417233108&q=Kiev&aqi=no
// Call Current in city Kiev

const getWeatherData = (infoType: any, searchParams: any) => {
    const url = new URL(BASE_URL + infoType);
    // @ts-ignore
    url.search = new URLSearchParams({ ...searchParams, key: API_KEY })

    return fetch(url).then((response) => response.json())
}

const formatCurrentWeather = (data: any) => {
    const {
        location: { lat, lon, name, country, tz_id, localtime_epoch },
        current: { temp_c, wind_kph, humidity, feelslike_c, condition: { text, icon } },
        forecast: { forecastday }
    } = data
    const { maxtemp_c, mintemp_c } = forecastday[0].day
    const { sunrise, sunset } = forecastday[0].astro

    return { lat, lon, name, temp_c, maxtemp_c, mintemp_c, wind_kph, humidity, feelslike_c, country, text, icon, localtime_epoch, tz_id, sunrise, sunset }
}
const formatForecastWeather = (data: any) => {
    let { tz_id, forecast } = data;

    forecast = forecast.forecastday.slice(1, 6).map((d: any) => {
        return {
            title: formatToLocalTime(d.date_epoch, tz_id, "ccc"),
            temp: d.day.avgtemp_c,
            icon: d.day.condition.icon,
            hour: d.hour.slice(0, 5),
        }
    })
    return { tz_id, forecast }
}

const getFormattedWeatherData = async (searchParams: any) => {
    const formattedForecastWeather = await getWeatherData("forecast.json", searchParams).then(formatForecastWeather);
    const formattedCurrentWeather = await getWeatherData("forecast.json", searchParams).then(formatCurrentWeather);

    return { ...formattedCurrentWeather, ...formattedForecastWeather }
}

const formatToLocalTime = (secs: any, zone: any, format = "cccc, dd LLLL yyyy'| Local time: 'HH:MM") =>
    DateTime.fromSeconds(secs).setZone(zone).toFormat(format)




export default getFormattedWeatherData

export { formatToLocalTime }