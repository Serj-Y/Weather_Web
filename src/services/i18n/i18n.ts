import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    fallbackLng: "en",
    resources: {
      en: {
        translation: {
          Realfeel: "Real feel:",
          Humidity: "Humidity:",
          Wind: "Wind:",
          WindSpeedKph: "km/h",
          WindSpeedMph: "mph",
          Rise: "Rise:",
          Max: "Max:",
          Min: "Min:",
          Set: "Set:",

          Hourly: "Hourly",
          Daily: "Daily",
          NotFound: "Not Found",
          CityNotFound: "City Not Found",
          Weatherfor: "Weather for",
          Loading: "Loading...",

          TemperatureC: "Temperature in: Celsius",
          TemperatureF: "Temperature in: Fahrenheit",
          Searchcity: "Search for city...",

          Forecast: "Forecast",

          AllRights: "All Rights Reserved",
          ContactUs: "Contact us:",
          ChangeLang: "Language Changed to: English",
        },
      },
      uk: {
        translation: {
          Realfeel: "Відчувається як:",
          Humidity: "Відносна вологість:",
          Wind: "Пориви вітру:",
          WindSpeedKph: "км/год",
          WindSpeedMph: "міл/год",
          Rise: "Схід:",
          Max: "Макс:",
          Min: "Мін:",
          Set: "Захід:",

          Hourly: "Погодинний",
          Daily: "Поденный",
          NotFound: "Не знайдено",
          CityNotFound: "Місто не знайдено",
          Weatherfor: "Прогноз для ",
          Loading: "Завантаження...",

          TemperatureC: "Температура в: Цельсиях",
          TemperatureF: "Температура в: Фаренгейтах",
          Searchcity: "Пошук міста...",

          Forecast: "Прогноз",

          AllRights: "Всі права захищені.",
          ContactUs: "Зв'яжіться з нами:",
          ChangeLang: "Мову змінено на: Українську",
        },
      },
    },
  });
