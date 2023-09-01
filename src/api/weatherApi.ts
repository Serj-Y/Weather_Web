const API_KEY = "91bb73b14b5546859b4102417233108"
const BASE_URL = "http://api.weatherapi.com/v1/"

//http://api.weatherapi.com/v1/current.json?key= 91bb73b14b5546859b4102417233108&q=Kiev&aqi=no
// Call Current in city Kiev

const getWeatherData = (infoType: any, searchParams: any) => {
    const url = new URL(BASE_URL + infoType);
    //@ts-ignore
    url.search = new URLSearchParams({ ...searchParams, key: API_KEY })

    return fetch(url).then((response) => response.json())
}

const formatCurrentWeather = (data: any) => {
    const {
        location: { lat, lon, name, country },
        current: { temp_c, wind_kph, humidity, feelslike_c, condition: { text, icon } },
        forecast: { forecastday }
    } = data
    const { maxtemp_c, mintemp_c } = forecastday[0].day
    
    return { lat, lon, name, temp_c, maxtemp_c, mintemp_c, wind_kph, humidity, feelslike_c, country, text, icon }
}

const getFormattedWeatherData = async (searchParams: any) => {
    const formattedWeatherData = await getWeatherData("forecast.json", searchParams).then(formatCurrentWeather);

    return formattedWeatherData
}

export default getFormattedWeatherData