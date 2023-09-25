import { useMemo, useState } from "react";
import TopButtons from "./components/TopButtons";
import Inputs from "./components/Inputs";
import TimeAndLocation from "./components/TimeAndLocation";
import TemperatureAndDetails from "./components/TemperatureAndDetails";
import Forecast from "./components/Forecast";
import Footer from "./components/Footer";
import { convertFrom12To24Format } from "./utils/helpers";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
import { useWeather } from "./hooks/useWeather";

function App() {
  const [query, setQuery] = useState("Kyiv");
  const [isFahrenheit, setFahrenheit] = useState(false);
  const { isLoading, weather } = useWeather(query);
  const { t } = useTranslation();

  const changeBackGroundColor = useMemo(() => {
    if (weather?.dailyForecast) {
      const temp = weather?.temp_c;
      if (!weather) return "from-cyan-500 to-blue-500";
      if (temp <= 15) return "from-cyan-600 to-blue-600";
      if (temp >= 30) return "from-yellow-500 to-orange-500";
      return "from-cyan-500 to-blue-500";
    }
    return "from-cyan-500 to-blue-500";
  }, [weather]);

  const changeGradientPosition = useMemo(() => {
    if (weather?.dailyForecast) {
      const time = convertFrom12To24Format(
        weather?.fiveHourForecast[0].title,
        false
      );
      if (time < "12:00") return "bg-gradient-to-br";
      if (time > "16:00") return "bg-gradient-to-bl";
      return "bg-gradient-to-b";
    }
    return "bg-gradient-to-b";
  }, [weather?.dailyForecast, weather?.fiveHourForecast]);

  return (
    <div
      className={`mx-auto w-screen  py-5 px-5 md:px-32  ${changeGradientPosition} ${changeBackGroundColor} min-h-screen`}
    >
      <div className="mx-auto max-w-screen-md py-5 px-5 md:px-32 h-fit shadow-2xl backdrop-blur-3xl">
        <TopButtons setQuery={setQuery} />
        <Inputs setQuery={setQuery} setFahrenheit={setFahrenheit} />
        {!isLoading && weather !== undefined ? (
          <div>
            <TimeAndLocation isFahrenheit={isFahrenheit} weather={weather} />
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
              items={weather.dailyForecast}
              title={t("Daily")}
            />
          </div>
        ) : (
          <div className=" text-white text-3xl text-center font-medium">
            {t("Loading")}
          </div>
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
