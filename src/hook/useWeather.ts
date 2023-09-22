import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { WeatherApiV2 } from "../api/weatherApiV2";

export const useWeather = (query: any, isFahrenheit: boolean) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [weatherV2, setWeatherV2] = useState<any>(null);
  const { t, i18n } = useTranslation();

  const lang = i18n.language

  useEffect(() => {
    setIsLoading(true);
    new WeatherApiV2()
      .setLang(lang)
      .setCity(query)
      .setUnits(isFahrenheit ? "imperial" : "metric")
      .fetch()
      .then((res) => {
        setWeatherV2(res.data);
      })
      .catch((error) => {
        toast.error(t(error.message));
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [query, isFahrenheit, lang]);

  return { isLoading, isError, weatherV2 }
};