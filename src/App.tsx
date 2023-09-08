import React, { useEffect, useState } from "react";
import TopButtons from "./components/TopButtons";
import Inputs from "./components/Inputs";
import TimeAndLocation from "./components/TimeAndLocation";
import TemperatureAndDetails from "./components/TemperatureAndDetails";
import Forecast from "./components/Forecast";
import getFormattedWeatherData from "./api/weatherApi";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";


type WeatherType = {
  country: string
  feelslike_c: 18.4
  fiveHourForecast: any
  forecast: { forecast: any }
  humidity: number
  icon: string
  lat: number
  localtime_epoch: number
  lon: number
  maxtemp_c: number
  mintemp_c: number
  name: string
  sunrise: string
  sunset: string
  temp_c: number
  text: string
  tz_id?: string
  wind_kph: number

}

function App() {
  const [query, setQuery] = useState("Kyiv")
  const [isFahrenheit, setFahrenheit] = useState(false)
  const [weather, setWeather] = useState<WeatherType | any>(null)
  const { t } = useTranslation()
  useEffect(() => {
    const fetchWeather = async () => {
      await getFormattedWeatherData(query).then(
        (data) => {
          setWeather(data)
          if (data.name) {
            const message = data.name ? data.name : t("NotFound")
            toast.success(t("Weatherfor") + message)
          } else {
            toast.error(t("CityNotFound"))
          }
        }
      )
    }
    fetchWeather()
  }, [query])

  const changeBackGroundColor = () => {
    if (weather?.forecast) {
      const temp = weather?.temp_c
      if (!weather) return "from-cyan-500 to-blue-500"
      if (temp <= 15) return "from-cyan-600 to-blue-600"
      if (temp >= 30) return "from-yellow-500 to-orange-500"
      return "from-cyan-500 to-blue-500"
    }
    return "from-cyan-500 to-blue-500"
  }

  const changeGradientPosition = () => {
    if (weather?.forecast) {
      const time = weather?.fiveHourForecast[0].title;
      if (time < "12:00") return "bg-gradient-to-br"
      if (time > "16:00") return "bg-gradient-to-bl"
      return "bg-gradient-to-b"
    } return "bg-gradient-to-b"

  }

  return (
    <div className={`mx-auto max-w-screen-md py-5 px-5 md:px-32  ${changeGradientPosition()} ${changeBackGroundColor()} h-fit shadow-xl shadow-gray-400`}>
      <TopButtons setQuery={setQuery} />
      <Inputs setQuery={setQuery} setFahrenheit={setFahrenheit} />
      {weather?.fiveHourForecast ? <div>
        <TimeAndLocation weather={weather} />
        <TemperatureAndDetails isFahrenheit={isFahrenheit} weather={weather} />
        <Forecast isFahrenheit={isFahrenheit} items={weather.fiveHourForecast} title={t("Hourly") }/>
        <Forecast isFahrenheit={isFahrenheit} items={weather.forecast} title={t("Daily")} />
      </div> : <div className=" text-white text-3xl text-center font-medium">{ t("CityNotFound")}</div>}
      <ToastContainer hideProgressBar transition={Slide} autoClose={1000} newestOnTop={true} theme={"colored"} />
    </div>
  );
}

export default App;
