import { useMemo, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import TopButtons from "./components/TopButtons";
import Inputs from "./components/Inputs";
import TimeAndLocation from "./components/TimeAndLocation";
import TemperatureAndDetails from "./components/TemperatureAndDetails";
import Forecast from "./components/Forecast";
import { Slide, ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";
import Footer from "./components/Footer";
import { getBackgroundColor } from "./helpers/getBackgroundColor";
import { getGradientPositionClass } from "./helpers/getGradientPositionClass";
import { useWeather } from "./hooks/useWeather";
import { Spinner } from "./components/Spinner";

// Тип или тут или в weatherApi.ts - один должен быть
export type WeatherType = {
  country: string;
  feelslike_c: 18.4;
  fiveHourForecast: any; // Дополнить -> any === vanila js
  forecast: { forecast: any }; // Дополнить -> any === vanila js
  humidity: number;
  icon: string;
  lat: number;
  localtime_epoch: number;
  lon: number;
  maxtemp_c: number;
  mintemp_c: number;
  name: string;
  sunrise: string;
  sunset: string;
  temp_c: number;
  text: string;
  tz_id?: string;
  wind_kph: number;
};

function App() {
  const [query, setQuery] = useState<string>("Kyiv");
  const [isFahrenheit, setFahrenheit] = useState<boolean>(false);
  const { isLoading, weather } = useWeather({ query });

  const { t } = useTranslation();

  const backGroundColorClass = useMemo(
    () => getBackgroundColor(weather),
    [weather]
  );

  const gradientPositionClass = useMemo(
    () => getGradientPositionClass(weather),
    [weather]
  );

  return (
    <div
      className={`mx-auto w-screen  py-5 px-5 md:px-32  ${gradientPositionClass} ${backGroundColorClass} min-h-screen`}
    >
      <div className="mx-auto max-w-screen-md py-5 px-5 md:px-32 h-fit shadow-2xl backdrop-blur-3xl">
        <TopButtons setQuery={setQuery} />
        <Inputs setQuery={setQuery} setFahrenheit={setFahrenheit} />

        {isLoading ? (
          <div className="flex justify-center py-10">
            <Spinner />
          </div>
        ) : (
          <>
            {weather?.fiveHourForecast ? (
              <div>
                <TimeAndLocation weather={weather} />
                <TemperatureAndDetails
                  isFahrenheit={isFahrenheit}
                  weather={weather}
                />
                <Forecast
                  isFahrenheit={isFahrenheit}
                  items={weather.fiveHourForecast}
                  title={t("Hourly")}
                />
                <Forecast
                  isFahrenheit={isFahrenheit}
                  items={weather.forecast}
                  title={t("Daily")}
                />
              </div>
            ) : (
              <div className=" text-white text-3xl text-center font-medium">
                {t("CityNotFound")}
              </div>
            )}
          </>
        )}

        <ToastContainer
          hideProgressBar
          transition={Slide}
          autoClose={1000}
          newestOnTop={true}
          theme={"colored"}
        />
        <Footer />
      </div>
    </div>
  );
}

export default App;
