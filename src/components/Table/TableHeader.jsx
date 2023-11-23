import React from 'react'

export default function TableHeader({ data }) {
  const renderThs = () => {
    return data.map((dt, index) => {
      return (
        <th
          key={index}
          className={`${dt.className} border border-primary bg-primary text-white text-main uppercase py-2`}
        >
          {dt.title}
        </th>
      )
    })
  }

  return (
    <thead>
      <tr>{renderThs()}</tr>
    </thead>
  )
}
