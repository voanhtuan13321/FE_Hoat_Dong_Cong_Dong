import React, { useEffect, useState } from 'react'
import Title from '../components/Title'
import Table from '../components/Table'
import Button from '../components/Button'

const dataTable = {
  header: [
    { className: 'w-5%', title: 'STT' },
    { className: 'w-20%', title: 'Mã sinh viên' },
    { className: '', title: 'Họ và tên' },
    { className: 'w-20%', title: 'Lớp' },
    { className: 'w-20%', title: 'Điểm' },
  ],
  value: [
    {
      maSinhVien: 'gv001',
      hoVaTen: 'vo anh tuan 1',
      lop: '18CNTT',
      diem: '40',
    },
    {
      maSinhVien: 'gv001',
      hoVaTen: 'vo anh tuan 1',
      lop: '18CNTT',
      diem: '40',
    },
    {
      maSinhVien: 'gv001',
      hoVaTen: 'vo anh tuan 1',
      lop: '18CNTT',
      diem: '40',
    },
    {
      maSinhVien: 'gv001',
      hoVaTen: 'vo anh tuan 1',
      lop: '18CNTT',
      diem: '40',
    },
    {
      maSinhVien: 'gv001',
      hoVaTen: 'vo anh tuan 1',
      lop: '18CNTT',
      diem: '40',
    },
    {
      maSinhVien: 'gv001',
      hoVaTen: 'vo anh tuan 1',
      lop: '18CNTT',
      diem: '40',
    },
    {
      maSinhVien: 'gv001',
      hoVaTen: 'vo anh tuan 1',
      lop: '18CNTT',
      diem: '40',
    },
    {
      maSinhVien: 'gv001',
      hoVaTen: 'vo anh tuan 1',
      lop: '18CNTT',
      diem: '40',
    },
  ],
}

export default function AdminHoatDongCongDongCuaTruong() {
  const [data, setData] = useState([])

  useEffect(() => {
    setData(dataTable.value)
  }, [])

  const renderBodyTable = () => {
    return data.map((dt, index) => {
      return (
        <tr key={index}>
          <td className='border border-primary p-1 text-center text-main'>
            {index + 1}
          </td>
          <td className='border border-primary p-1 text-center text-main'>
            {dt.maSinhVien}
          </td>
          <td className='border border-primary p-1  text-main'>{dt.hoVaTen}</td>
          <td className='border border-primary p-1 text-center text-main'>
            {dt.lop}
          </td>
          <td className='border border-primary p-1 text-center text-main'>
            {dt.diem}
          </td>
        </tr>
      )
    })
  }

  return (
    <>
      <div className='container mx-auto'>
        <div className='p-2'>
          <Title title='Danh sách sinh viên của trường' />
        </div>
        <div className='p-2'>
          <div className='text-end pb-2'>
            <Button label={'Xuất file'} />
          </div>
          <Table header={dataTable.header}>{renderBodyTable()}</Table>
        </div>
      </div>
    </>
  )
}
