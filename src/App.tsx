import React, { useEffect, useState } from 'react';
import TopButtons from './components/TopButtons';
import Inputs from './components/Inputs';
import TimeAndLocation from './components/TimeAndLocation';
import TemperatureAndDetails from "./components/TemperatureAndDetails";
import Forecast from "./components/Forecast";
import getFormattedWeatherData from "./api/weatherApi";


function App() {

  const [query, setQuery] = useState("Kiev")
  const [lastData, setLastData] = useState(null) as any
  const [weather, setWeather] = useState(null) as any
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    const fetchWeather = async () => {
      await getFormattedWeatherData(query).then(
        (data) => {
          //@ts-ignore
          setWeather(data)
          if (weather) {
            const hourItems = weather?.forecast.map((i: any) => i.hour.filter((f: any) => f.time_epoch >= weather.localtime_epoch)).slice(0, 2)
            let concat = hourItems[0].concat(hourItems[1])
            setLastData(concat.slice(0, 5))
          } {
            setRefresh(true)
          }
        })
    }
    fetchWeather()
  }, [query, refresh])



  return (
    <div className=" mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-b from-cyan-500 to-blue-500 h-fit shadow-xl shadow-gray-400">
      <TopButtons setQuery={setQuery} />
      <Inputs setQuery={setQuery} />
      {weather ? <div>
        <TimeAndLocation weather={weather} />
        <TemperatureAndDetails weather={weather} />
        <Forecast items={lastData} title="Hourly" />
        {/* <Forecast items={weather.forecast[0].hour}  title="Hourly" /> */}
        <Forecast items={weather.forecast} title="Daily" />
      </div> : <></>}
    </div>
  );
}

export default App;
