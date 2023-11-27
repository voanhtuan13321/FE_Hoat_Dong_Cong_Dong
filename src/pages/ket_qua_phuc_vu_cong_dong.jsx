import React from 'react'
import Title from '../components/Title'
import Table from '../components/Table'

export default function KetQuaPhucVuCongDong() {
  const dataTable = {
    header: [
      { className: 'w-1/12', title: 'stt' },
      { className: 'w-2/12', title: 'Năm' },
      { className: 'w-5/12', title: 'Tên hoạt động' },
      { className: 'w-2/12', title: 'Điểm' },
      { className: 'w-2/12', title: 'Ghi chú' },
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
  const renderBodyTable = () => {
    return dataTable.value.map((dt, index) => {
      return (
        <tr key={index}>
          <td className='border border-primary p-1 text-center'>{dt.stt}</td>
          <td className='border border-primary p-1 text-center'>{dt.year}</td>
          <td className='border border-primary p-1 text-center'>{dt.name}</td>
          <td className='border border-primary p-1 text-center'>{dt.point}</td>
          <td className='border border-primary p-1'>{dt.note}</td>
        </tr>
      )
    })
  }

  return (
    <>
      <div className='container justify-center m-auto p-2'>
        <Title title={'Kết quả phục vụ cộng đồng'} ></Title>
        <div className='my-2'>
          <Table data={dataTable}>{renderBodyTable()}</Table>
        </div>
      </div>
    </>
  )
}
