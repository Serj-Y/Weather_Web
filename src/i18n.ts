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
                    test: "Not Found",
                    Realfeel: "Real feel:",
                    Humidity: "Humidity:",
                    Wind:"Wind:",
                    WindStead:"km/h",
                    Rise:"Rise:",
                    Max:"Max:",
                    Min:"Min:",
                    Set:"Set:",
                }
            },
            ua: {
                translation: {
                    test: "не найдено",
                    Realfeel: "Відчувається як:",
                    Humidity: "Відносна вологість:",
                    Wind:"Пориви вітру:",
                    WindStead:"км/год",
                    Rise:"Схід:",
                    Max:"Макс:",
                    Min:"Мін:",
                    Set:"Захід:",

                }
            },

        }

    })

    export default i18next