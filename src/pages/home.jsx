import React from 'react'
import Table from '../components/Table'

const dataTable = {
  header: [
    { className: 'w-1/6', title: 'stt' },
    { className: 'w-5/6', title: 'email' },
  ],
  value: [
    { stt: 1, email: 'test@example.com' },
    { stt: 1, email: 'test@example.comqwerqwe' },
  ],
}

export default function Home() {
  const renderBodyTable = () => {
    return dataTable.value.map((dt, index) => {
      return (
        <tr key={index}>
          <td className='border border-primary p-1'>{dt.stt}</td>
          <td className='border border-primary p-1'>{dt.email}</td>
        </tr>
      )
    })
  }

  return (
    <>
      <div>Home</div>
      <div>
        <Table data={dataTable}>{renderBodyTable()}</Table>
      </div>
    </>
  )
}
