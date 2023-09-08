import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'



i18next
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        fallbackLng: "ua",
        resources: {
            en: {
                translation: {
                    Realfeel: "Real feel:",
                    Humidity: "Humidity:",
                    Wind:"Wind:",
                    WindStead:"km/h",
                    Rise:"Rise:",
                    Max:"Max:",
                    Min:"Min:",
                    Set:"Set:",

                    Hourly: "Hourly",
                    Daily: "Daily",
                    NotFound:"Not Found",
                    CityNotFound: "City Not Found",
                    Weatherfor: "Weather for",
                }
            },
            ua: {
                translation: {
                    Realfeel: "Відчувається як:",
                    Humidity: "Відносна вологість:",
                    Wind:"Пориви вітру:",
                    WindStead:"км/год",
                    Rise:"Схід:",
                    Max:"Макс:",
                    Min:"Мін:",
                    Set:"Захід:",

                   Hourly: "Погодинний",
                   Daily: "Поденный",
                   NotFound:"Не знайдено",
                   CityNotFound: "Місто не знайдено",
                   Weatherfor: "Прогноз для ",

                }
            },

        }

    })

    export default i18next