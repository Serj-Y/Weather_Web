import React, { useState } from 'react'
import { useTranslation } from "react-i18next"
import { GoSearch, GoLocation } from "react-icons/go"
import { toast } from "react-toastify"


type PropsType = {
    setFahrenheit: any
    setQuery: (city: any) => void
}

export default function Inputs({ setQuery, setFahrenheit }: PropsType) {
    const { t } = useTranslation()
    const [city, setCity] = useState("")
    const [tempUnits, setTempUnits]=useState("C")

    const handleSearchClick = () => {
        if (city !== "") {
            setQuery({q:city})
            setCity("")
        }
    }

    const handleLocationClick = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const lat = position.coords.latitude.toString().slice(0, 6)
                const lon = position.coords.longitude.toString().slice(0, 6)
                const coordinate = `${lat},${lon}`

                setQuery({lat:lat ,lon:lon})
            })
        }
    }

    const handleCelsiusClick = () => {
        setFahrenheit(false)
        toast.info(t("TemperatureC"))
        setTempUnits("C")
    }

    const handleFahrenheitClick = () => {
        setFahrenheit(true)
        toast.info(t("TemperatureF"))
        setTempUnits("F")
    }

    return (
        <div className="flex flex-row justify-center my-6" >
            <div className="flex w-3/4 items-center justify-center space-x-4">
                <input type="text"
                    value={city}
                    onChange={(e) => setCity(e.currentTarget.value)}
                    placeholder={t("Searchcity")}
                    className="text-xl font-light p-2 focus:outline-none w-full shadow-xl capitalize placeholder:lowercase"
                />
                <GoSearch size={25}
                    onClick={handleSearchClick} className="text-white cursor-pointer transition ease-out hover:scale-125"
                />
                <GoLocation size={25}
                    onClick={handleLocationClick} className="text-white cursor-pointer transition ease-out hover:scale-125"
                />
            </div>
            <div className="flex flex-row w-1/4 items-center justify-center" >
                <button onClick={() => handleCelsiusClick()} className="text-xl text-white font-light cursor-pointer transition ease-out hover:scale-125" disabled={tempUnits === "C"} >°C</button>
                <p className="text-xl text-white mx-1" >|</p>
                <button onClick={() => handleFahrenheitClick()} className="text-xl text-white font-light cursor-pointer transition ease-out hover:scale-125" disabled={tempUnits === "F"}>°F</button>
            </div>
        </div>
    )
}
