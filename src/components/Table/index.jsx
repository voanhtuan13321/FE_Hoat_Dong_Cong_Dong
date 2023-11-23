import React from 'react'
import TableHeader from './TableHeader'

export default function Table({ data, children }) {
  return (
    <table className='w-full'>
      <TableHeader data={data.header} />
      <tbody>{children}</tbody>
    </table>
  )
}
