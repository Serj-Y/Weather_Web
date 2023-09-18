import React from "react"
<<<<<<< Updated upstream:src/helpers/TimeAndLocation.tsx
import { formatToLocalTime } from "./formatToLocalTime"
=======
import { formatToLocalTime } from "./helpers/formatToLocalTime"
>>>>>>> Stashed changes:src/components/TimeAndLocation.tsx

type PropsType = {
    weather: {
        localtime_epoch: number
        tz_id: string
        name: string
        country: string
    }
}

export default function TimeAndLocation({ weather: { localtime_epoch, tz_id, name, country } }: PropsType) {
    return (
        <div>
            <div className="flex items-center justify-center my-6" >
                <p className=" text-white text-xl font-extralight" >
                    {localtime_epoch ? formatToLocalTime(localtime_epoch, tz_id) : <></>}
                </p>
            </div>
            <div className="flex items-center justify-center my-3" >
                <p className=" text-white text-3xl font-medium" >
                    {name}, {country}
                </p>
            </div>
        </div>
    )
}
