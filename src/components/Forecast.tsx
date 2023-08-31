import React from 'react'

type PropsType = {
title: string
}

export default function Forecast({title}: PropsType) {
    return (
        <div>
            <div className="flex items-center justify-start mt-6" >
                <p className="text-white font-medium uppercase" >
                    {title} Forecast
                </p>
            </div>
            <hr className="my-2" />
            <div className="flex flex-grow items-center justify-between text-white" >
                <div className="flex flex-col items-center justify-center" >
                    <p className="font-light text-sm">
                        04:30
                    </p>
                    <img className="w-12 my-2" src="https://cdn-icons-png.flaticon.com/512/169/169367.png" alt="forecastImg" />
                    <p className="font-medium" >18°</p>
                </div>
                <div className="flex flex-col items-center justify-center" >
                    <p className="font-light text-sm">
                        05:30
                    </p>
                    <img className="w-12 my-2" src="https://cdn-icons-png.flaticon.com/512/169/169367.png" alt="forecastImg" />
                    <p className="font-medium" >17°</p>
                </div>
                <div className="flex flex-col items-center justify-center" >
                    <p className="font-light text-sm">
                        06:30
                    </p>
                    <img className="w-12 my-2" src="https://cdn-icons-png.flaticon.com/512/169/169367.png" alt="forecastImg" />
                    <p className="font-medium" >16°</p>
                </div>
                <div className="flex flex-col items-center justify-center" >
                    <p className="font-light text-sm">
                        07:30
                    </p>
                    <img className="w-12 my-2" src="https://cdn-icons-png.flaticon.com/512/169/169367.png" alt="forecastImg" />
                    <p className="font-medium" >16°</p>
                </div>
                <div className="flex flex-col items-center justify-center" >
                    <p className="font-light text-sm">
                        08:30
                    </p>
                    <img className="w-12 my-2" src="https://cdn-icons-png.flaticon.com/512/169/169367.png" alt="forecastImg" />
                    <p className="font-medium" >17°</p>
                </div>
            </div>
        </div>
    )
}
