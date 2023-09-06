import React, { useState } from 'react'
import { GoSearch, GoLocation } from "react-icons/go"
import { toast } from "react-toastify"


export default function Inputs({ setQuery, setFahrenheit }: any) {

    const [city, setCity] = useState("")

    const handleSearchClick = () => {
        if (city !== "") {
            setQuery(city)
            setCity("")
        }
    }

    const handleLocationClick = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                let lat = position.coords.latitude.toString().slice(0, 6)
                let lon = position.coords.longitude.toString().slice(0, 6)
                const coordinate = `${lat},${lon}`

                setQuery(coordinate)
            })
        }
    }

    const handleCelsiusClick = () => {
        setFahrenheit(false)
        toast.info("Temperature units: Celsius ")
    }

    const handleFahrenheitClick = () => {
        setFahrenheit(true)
        toast.info("Temperature units: Fahrenheit ")
    }

    return (
        <div className="flex flex-row justify-center my-6" >
            <div className="flex fle-row w-3/4 items-center justify-center space-x-4">
                <input type="text"
                    value={city}
                    onChange={(e) => setCity(e.currentTarget.value)}
                    placeholder="Search for city..."
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
                <button onClick={() => handleCelsiusClick()} className="text-xl text-white font-light cursor-pointer transition ease-out hover:scale-125" >°C</button>
                <p className="text-xl text-white mx-1" >|</p>
                <button onClick={() => handleFahrenheitClick()} name="imperial" className="text-xl text-white font-light cursor-pointer transition ease-out hover:scale-125">°F</button>
            </div>
        </div>
    )
}
