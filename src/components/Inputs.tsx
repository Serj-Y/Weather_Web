import React from 'react'
import { GoSearch, GoLocation } from "react-icons/go"


export default function Inputs() {
    return (
        <div className="flex flex-row justify-center my-6" >
            <div className="flex fle-row w-3/4 items-center justify-center space-x-4">
                <input type="text"
                    name=""
                    id=""
                    placeholder="Search for city..."
                    className="text-xl font-light p-2 focus:outline-none w-full shadow-xl capitalize placeholder:lowercase"
                />
                <GoSearch size={25}
                    className="text-white cursor-pointer transition ease-out hover:scale-125"
                />
                <GoLocation size={25}
                    className="text-white cursor-pointer transition ease-out hover:scale-125"
                />
            </div>
            <div className="flex flex-row w-1/4 items-center justify-center" >
                <button name="metric" className="text-xl text-white font-light" >°C</button>
                <p className="text-xl text-white mx-1 mb-1 " >|</p>
                <button name="imperial" className="text-xl text-white font-light">°F</button>
            </div>
        </div>
    )
}
