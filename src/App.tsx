import React, { useEffect, useState } from 'react';
import TopButtons from './components/TopButtons';
import Inputs from './components/Inputs';
import TimeAndLocation from './components/TimeAndLocation';
import TemperatureAndDetails from "./components/TemperatureAndDetails";
import Forecast from "./components/Forecast";
import getFormattedWeatherData from "./api/weatherApi";


function App() {

  const [query, setQuery] = useState("Kiev")
  const [isFahrenheit, setFahrenheit] = useState(false)
  const [lastData, setLastData] = useState(null) as any
  const [weather, setWeather] = useState(null) as any
  const [refresh, setRefresh] = useState(false)

console.log(weather)
  useEffect(() => {
    const fetchWeather = async () => {
      await getFormattedWeatherData(query).then(
        (data) => {
          setWeather(data)
        }
      )
    }
    fetchWeather()
  }, [query])

  return (
    <div className=" mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-b from-cyan-500 to-blue-500 h-fit shadow-xl shadow-gray-400">
      <TopButtons setQuery={setQuery} />
      <Inputs setQuery={setQuery} setFahrenheit={setFahrenheit} />
      {weather?.fiveHourForecast ? <div>
        <TimeAndLocation weather={weather} />
        <TemperatureAndDetails isFahrenheit={isFahrenheit} weather={weather} />
        <Forecast isFahrenheit={isFahrenheit} items={weather.fiveHourForecast} title="Hourly" />
        <Forecast isFahrenheit={isFahrenheit} items={weather.forecast} title="Daily" />
      </div> : <div className=" text-white text-3xl text-center font-medium">Not Found</div>}
    </div>
  );
}

export default App;
