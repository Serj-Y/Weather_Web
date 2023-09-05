import React, { useEffect, useState } from 'react';
import TopButtons from './components/TopButtons';
import Inputs from './components/Inputs';
import TimeAndLocation from './components/TimeAndLocation';
import TemperatureAndDetails from "./components/TemperatureAndDetails";
import Forecast from "./components/Forecast";
import getFormattedWeatherData from "./api/weatherApi";



function App() {

  const [query, setQuery] = useState({ q: "Kiev", days: 6 })
  const [weather, setWeather] = useState(null) as any

  // const hourItems = weather?.forecast.map((i: any) => i.hour.filter((f:any)=> f.time_epoch >= weather.localtime_epoch ) ).slice(0,1)



  // console.log(hourItems)

  useEffect(() => {
    const fetchWeather = async () => {
      await getFormattedWeatherData({ ...query }).then(
        (data) => {
          //@ts-ignore
          setWeather(data);
        })
    }
    fetchWeather()
  }, [query])
 
  console.log(weather)

  return (
    <div className=" mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-b from-cyan-500 to-blue-500 h-fit shadow-xl shadow-gray-400">
      <TopButtons />
      <Inputs />
      {weather ? <div>
        <TimeAndLocation  weather={weather} />
        <TemperatureAndDetails weather={weather} />
        {/* <Forecast items={[...hourItems]}  title="Hourly" /> */}
        {/* <Forecast items={weather.forecast[0].hour}  title="Hourly" /> */}
        <Forecast items={weather.forecast} title="Daily" />
      </div> : <></>}
    </div>
  );
}

export default App;
