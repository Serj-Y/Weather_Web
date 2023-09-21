import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { WeatherApiV2 } from "../api/weatherApiV2";

export const useWeather = (query: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [weatherV2, setWeatherV2] = useState<any>(null);
  const { t } = useTranslation();

  useEffect(() => {
    console.log(query)
    setIsLoading(true);
    new WeatherApiV2()
    
      .setCity(query)
      .fetch()
      .then((res) => {
        setWeatherV2(res);
      })
      .catch((error) => {
        toast.error(t(error.message));
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [query]);

  return {isLoading, isError, weatherV2}
};