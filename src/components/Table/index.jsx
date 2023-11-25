import React from 'react'
import TableHeader from './TableHeader'

/**
 * const dataTable = {
  header: [
    { className: 'w-1/6', title: 'stt' },
    { className: 'w-5/6', title: 'email' },
  ],
  value: [
    { stt: 1, email: 'test@example.com' },
    { stt: 1, email: 'test@example.comqwerqwe' },
  ],
}
 * const renderBodyTable = () => {
    return dataTable.value.map((dt, index) => {
      return (
        <tr key={index}>
          <td className='border border-primary p-1'>{dt.stt}</td>
          <td className='border border-primary p-1'>{dt.email}</td>
        </tr>
      )
    })
  }
 *
 * <Table data={dataTable}>{renderBodyTable()}</Table>
 *
 * @param data
 * @param children
 * @returns
 */
export default function Table({ data, children }) {
  return (
    <table className='w-full'>
      <TableHeader data={data.header} />
      <tbody>{children}</tbody>
    </table>
  )
}
