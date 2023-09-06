import React from 'react'
import { celsiusToFahrenheit } from "./celsiusToFahrenheit"


type PropsType = {
    title: string
    items: any
    isFahrenheit: boolean
}

export default function Forecast({ title, items, isFahrenheit }: PropsType) {
    return (
        <div>
            {items? <>
                <div className="flex items-center justify-start mt-6" >
                    <p className="text-white font-medium uppercase" >
                        {title} Forecast
                    </p>
                </div>
                <hr className="my-2" />
                <div className="flex flex-grow items-center justify-between text-white" >
                    {items.map((item: any) =>
                        <div key={item.time} className="flex flex-col items-center justify-center" >
                            <p className="font-light text-sm">
                                {item.title || item.time.slice(10)}
                            </p>
                            <img className="w-12 my-2" src={item.icon || item.condition.icon} alt="forecastImg" />
                            <p className="font-medium" >{celsiusToFahrenheit(item.temp, isFahrenheit) || celsiusToFahrenheit(item?.temp_c, isFahrenheit)}°</p>
                        </div>
                    )}
                </div>
            </> : <></>}
        </div>
    )
}
