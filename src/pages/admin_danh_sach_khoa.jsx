import React, { useState, useEffect, useRef } from 'react'
import Title from '../components/Title'
import Table from '../components/Table/index'
import Button from '../components/Button'
import ItemRowTableDanhSachKhoaAdmin from '../components/ItemRowTableDanhSachKhoaAdmin'
import ItemRowTableDanhSachKhoaAdminAdd from '../components/ItemRowTableDanhSachKhoaAdminAdd'
import { requestHandler } from '../utils'

const dataTable = {
  header: [
    { className: 'w-5%', title: 'stt' },
    { className: 'w-25%', title: 'Tên khoa' },
    { className: '', title: 'Trưởng khoa' },
    { className: 'w-15%', title: '' },
  ],
}

export default function AdminDanhSachKhoa() {
  const [listKhoa, setListKhoa] = useState([])
  const [isShowAddNew, setShowAddNew] = useState(false)
  useEffect(() => {
    fetchListKhoa()
  }, [])

  const fetchListKhoa = () => {
    requestHandler.get('/api/Major/GetMajorsList').then(response => {
      setListKhoa(response.data)
      console.log("List khoa",response.data);
    })
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
          fetchListKhoa={fetchListKhoa}
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
