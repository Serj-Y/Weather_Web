import React, { useEffect, useState } from "react";
import TopButtons from "./components/TopButtons";
import Inputs from "./components/Inputs";
import TimeAndLocation from "./components/TimeAndLocation";
import TemperatureAndDetails from "./components/TemperatureAndDetails";
import Forecast from "./components/Forecast";
import getFormattedWeatherData from "./api/weatherApi";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  const [query, setQuery] = useState("Kiev")
  const [isFahrenheit, setFahrenheit] = useState(false)
  const [weather, setWeather] = useState(null) as any

  useEffect(() => {
    const fetchWeather = async () => {
      await getFormattedWeatherData(query).then(
        (data) => {
          setWeather(data)
          if (data.name) {
            const message = data.name ? data.name : "Not found"
            toast.success("Weather for " + message)
          } else { 
            toast.error("City Not Found") 
          }
        }
      )
    }
    fetchWeather()
  }, [query])

  return (
    <div className=" mx-auto max-w-screen-md py-5 px-5 md:px-32 bg-gradient-to-b from-cyan-500 to-blue-500 h-fit shadow-xl shadow-gray-400">
      <TopButtons setQuery={setQuery} />
      <Inputs setQuery={setQuery} setFahrenheit={setFahrenheit} />
      {weather?.fiveHourForecast ? <div>
        <TimeAndLocation weather={weather} />
        <TemperatureAndDetails isFahrenheit={isFahrenheit} weather={weather} />
        <Forecast isFahrenheit={isFahrenheit} items={weather.fiveHourForecast} title="Hourly" />
        <Forecast isFahrenheit={isFahrenheit} items={weather.forecast} title="Daily" />
      </div> : <div className=" text-white text-3xl text-center font-medium">Not Found</div>}
      <ToastContainer hideProgressBar transition={Slide} autoClose={1000} newestOnTop={true} theme={"colored"} />
    </div>
  );
}

export default App;
