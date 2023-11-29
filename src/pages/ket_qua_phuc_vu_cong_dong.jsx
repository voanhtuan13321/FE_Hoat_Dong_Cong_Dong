import React, { useEffect, useState } from 'react'
import Title from '../components/Title'
import Table from '../components/Table'

const dataTable = {
  header: [
    { className: 'w-5%', title: 'stt' },
    { className: 'w-15%', title: 'Năm' },
    { className: '', title: 'Tên hoạt động' },
    { className: 'w-10%', title: 'Điểm' },
    { className: 'w-20%', title: 'Ghi chú' },
  ],
  value: [
    { stt: 1, year: '2012-2013', name: 'Hiển máu', point: '10', note: '' },
    { stt: 1, year: '2012-2013', name: 'Hiển máu', point: '10', note: '' },
    { stt: 1, year: '2012-2013', name: 'Hiển máu', point: '10', note: '' },
    { stt: 1, year: '2012-2013', name: 'Hiển máu', point: '10', note: '' },
    { stt: 1, year: '2012-2013', name: 'Hiển máu', point: '10', note: '' },
    { stt: 1, year: '2012-2013', name: 'Hiển máu', point: '10', note: '' },
  ],
}

export default function KetQuaPhucVuCongDong() {
  const [data, setData] = useState([])

  useEffect(() => {
    setData(dataTable.value)
  }, [])

  const renderBodyTable = () => {
    let arrJsx = data.map((dt, index) => {
      return (
        <tr key={index}>
          <td className='border border-primary p-1 text-center text-main'>
            {dt.stt}
          </td>
          <td className='border border-primary p-1 text-center  text-main'>
            {dt.year}
          </td>
          <td className='border border-primary p-1 text-center  text-main'>
            {dt.name}
          </td>
          <td className='border border-primary p-1 text-center  text-main'>
            {dt.point}
          </td>
          <td className='border border-primary p-1  text-main'>{dt.note}</td>
        </tr>
      )
    })
    return arrJsx
  }

  return (
    <>
      <div className='container justify-center m-auto p-2'>
        <Title title={'Kết quả phục vụ cộng đồng'}></Title>
        <div className='my-2'>
          <Table header={dataTable.header}>{renderBodyTable()}</Table>
        </div>
      </div>
    </>
  )
}
