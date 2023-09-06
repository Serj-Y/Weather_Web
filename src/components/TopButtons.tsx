import React from 'react'

export default function TopButtons({setQuery}:any) {

  const cites = [
    {
      id: 1,
      title: "Kiev"
    },
    {
      id: 2,
      title: "London"
    },
    {
      id: 3,
      title: "Milan"
    },
    {
      id: 4,
      title: "Washington"
    }
  ]

  return (
    <div className="flex justify-between items-center my-6">
      {cites.map((city) => (
        <button key={city.id} className="text-white text-lg font-medium cursor-pointer transition ease-out hover:scale-125"  onClick={()=> setQuery( city.title)} >{city.title}</button>
      ))}
    </div>
  )
}
