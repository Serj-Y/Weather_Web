import React from 'react'
import { convertFrom12To24Format } from "./convertFrom12To24Format"
import { formatToLocalTime } from "../api/weatherApi"

type PropsType = {
    title: string
    items: any

}

export default function Forecast({ title, items}: PropsType) {
    // console.log(items)
    return (
        <div>
            <div className="flex items-center justify-start mt-6" >
                <p className="text-white font-medium uppercase" >
                    {title} Forecast
                </p>
            </div>
            <hr className="my-2" />
            <div className="flex flex-grow items-center justify-between text-white" >
                {items.map((item: any) =>
                    <div  className="flex flex-col items-center justify-center" >
                        <p className="font-light text-sm">
                            {item.title|| item.map((i: any) => i.time)}
                        </p>
                        <img className="w-12 my-2" src={item.icon||item[0].condition.icon} alt="forecastImg" />
                        <p className="font-medium" >{item.temp|| item.map((i: any)=>i.temp_c )}°</p>
                    </div>

                )}
                
            </div>
        </div>
    )
}
