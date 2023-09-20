import axios from "axios"

const BASE_URL = "https://api.openweathermap.org/data/2.5/"
const API_KEY = "e99e184c35cf7ecc1463769e65f64115"

//https://api.openweathermap.org/data/2.5/weather?q=London&appid=e99e184c35cf7ecc1463769e65f64115


function WeatherApi(city: string, searchParams: string) {
    async function getWeather(city: any) {
        try {
            const response = await axios.get(BASE_URL + searchParams, {
                params: {
                    ...city,
                    appid: API_KEY
                }
            });
            return response.data
        } catch (error) {
            console.error(error);
        }
    }
    return getWeather(city)
}
const formatWeather = (data: any) => {
    console.log(data, "formatWeather")
    return { data }
}


const getData = async (city: any) => {
    const Weather = await WeatherApi(city, "weather").then(formatWeather)
    return { ...Weather }
}

export default getData