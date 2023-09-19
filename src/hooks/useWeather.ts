import { useEffect, useState } from "react";
import { WeatherApi } from "../api/weatherApi";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { WeatherType } from "../App";

export const useWeather = ({query}: {query: string}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [weather, setWeather] = useState<WeatherType | any>(null);
  const { t } = useTranslation();

  useEffect(() => {
    setIsLoading(true);

    new WeatherApi()
      .setCity(query)
      .setHowDays(5)
      .fetch()
      .then((res) => {
        setWeather(res.data);
      })
      .catch((error) => {
        toast.error(t(error.message));
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [query, t]);

  return {isLoading, isError, weather}
};
