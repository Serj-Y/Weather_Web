import React from 'react'

export default function TopButtons() {

  const cites = [
    {
      id: 1,
      title: "Kyiv"
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
        <button key={city.id} className="text-white text-lg font-medium">{city.title}</button>
      ))}
    </div>
  )
}
