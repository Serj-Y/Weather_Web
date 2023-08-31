import React from 'react'
import { BsArrowUp, BsArrowDown, BsWind, BsSunset, BsSunrise, } from "react-icons/bs"
import { FaTemperatureHalf } from "react-icons/fa6"
import { WiHumidity } from "react-icons/wi"

export default function TemperatureAndDetails() {
  return (
    <div>
      <div className="flex items-center justify-center py-6 text-xl text-cyan-400">
        <p>
          Cloudy or whatever
        </p>
      </div>
      <div className="flex flex-row items-center justify-between text-white py-3" >
        <img className="w-20" src="https://cdn-icons-png.flaticon.com/512/169/169367.png" alt="img" />
        <p className="text-5xl" >26°</p>
        <div className="flex flex-col space-y-2" >
          <div className="flex font-light text-sm items-center justify-center" >
            <FaTemperatureHalf size={18} className="mr-1" />
            Real fell:
            <span className="font-medium ml-1" >28°</span>
          </div>
          <div className="flex font-light text-sm items-center justify-center" >
            <WiHumidity size={18} className="mr-1" />
            Humidity:
            <span className="font-medium ml-1" >28°</span>
          </div>
          <div className="flex font-light text-sm items-center justify-center" >
            <BsWind size={18} className="mr-1" />
            Wind:
            <span className="font-medium ml-1" >10 km/h</span>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center justify-center space-x-2 text-white text-sm py-2" >
        <BsSunrise size={18} />
        <p className="font-light" >
          Rise: <span className="font-medium ml-1 " > 6:33</span>
        </p>
        <p className="font-light" >|</p>
        <BsArrowUp size={18} />
        <p className="font-light" >
          Hight: <span className="font-medium ml-1 " > 32°</span>
        </p>
        <p className="font-light" >|</p>
        <BsArrowDown size={18} />
        <p className="font-light" >
          Low: <span className="font-medium ml-1 " >16°</span>
        </p>
        <p className="font-light" >|</p>
        <BsSunset size={18} />
        <p className="font-light" >
          Set: <span className="font-medium ml-1 " > 19:58</span>
        </p>
        <p className="font-light" >|</p>
      </div>
    </div>
  )
}
