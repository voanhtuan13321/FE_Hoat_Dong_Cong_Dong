import React, { useState, useEffect } from 'react'
import Title from '../components/Title'
import Table from '../components/Table/index'
import Button from '../components/Button'
import ItemRowTableDanhSachKhoaAdmin from '../components/ItemRowTableDanhSachKhoaAdmin'
import ItemRowTableDanhSachKhoaAdminAdd from '../components/ItemRowTableDanhSachKhoaAdminAdd'

const dataTable = {
  header: [
    { className: 'w-5%', title: 'stt' },
    { className: 'w-25%', title: 'Tên khoa' },
    { className: '', title: 'Trưởng khoa' },
    { className: 'w-15%', title: '' },
  ],
  value: [
    { stt: 1, khoa: 'K.Cơ khí', ten: 'Nguyễn Văn A' },
    { stt: 2, khoa: 'K.Cơ khí', ten: 'Nguyễn Văn B' },
    { stt: 3, khoa: 'K.Cơ khí', ten: 'Nguyễn Văn C' },
    { stt: 4, khoa: 'K.Cơ khí', ten: 'Nguyễn Văn D' },
  ],
}

export default function AdminDanhSachKhoa() {
  const [listKhoa, setListKhoa] = useState([])
  const [isShowAddNew, setShowAddNew] = useState(false)

  useEffect(() => {
    fetchListKhoa()
  }, [])

  const fetchListKhoa = () => {
    setListKhoa(dataTable.value)
  }

  const onClickThem = () => {
    setShowAddNew(true)
  }

  const renderBodyTable = () => {
    let arrJsx = listKhoa.map((dt, index) => {
      return <ItemRowTableDanhSachKhoaAdmin key={index} stt={index} data={dt} />
    })

    isShowAddNew &&
      (arrJsx = [
        ...arrJsx,
        <ItemRowTableDanhSachKhoaAdminAdd
          key={-1}
          setShowAddNew={setShowAddNew}
        />,
      ])

    return arrJsx
  }

  return (
    <>
      <div className='container mx-auto'>
        <Title title={'Danh sách khoa'} />

        <div className='flex justify-end my-2'>
          {!isShowAddNew && (
            <Button label='Thêm' type='add' onClick={onClickThem} />
          )}
        </div>
        <Table header={dataTable.header}>{renderBodyTable()}</Table>
      </div>
    </>
  )
}
