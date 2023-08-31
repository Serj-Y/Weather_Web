import React from 'react'

export default function TimeAndLocation() {
    return (
        <div>
            <div className="flex items-center justify-center my-6" >
                <p className=" text-white text-xl font-extralight" >
                    dddd, dd MMMM yyyy | Local time: hh:mm
                </p>
            </div>
            <div className="flex items-center justify-center my-3" >
                <p className=" text-white text-3xl font-medium" >
                  CurrentCity, Country
                </p>
            </div>
        </div>
    )
}
