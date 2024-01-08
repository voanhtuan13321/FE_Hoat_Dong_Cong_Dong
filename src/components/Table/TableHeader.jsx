import React from 'react'

/**
 * const data = {
  header: [
    { className: 'w-1/6', title: 'stt' },
    { className: 'w-5/6', title: 'email' },
  ],
  value: [
    { stt: 1, email: 'test@example.com' },
    { stt: 1, email: 'test@example.comqwerqwe' },
  ],
}
 *
 * <TableHeader data={data.header} />
 *
 * @param data
 * @returns
 */
export default function TableHeader({ data }) {
  const renderThs = () => {
    return data.map((dt, index) => {
      return (
        <th
          key={index}
          className={`${dt.className} border border-primary bg-primary text-white text-main text-center uppercase py-2`}
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
