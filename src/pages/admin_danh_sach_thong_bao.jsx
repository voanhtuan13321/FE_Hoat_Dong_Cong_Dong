import React, { useEffect, useState } from 'react'
import Title from '../components/Title'
import Button from '../components/Button'
import Table from '../components/Table'
import ItemRowTableDanhSachThongBaoAdmin from '../components/ItemRowTableDanhSachThongBaoAdmin'
import ItemRowTableDanhSachThongBaoAdminAdd from '../components/ItemRowTableDanhSachThongBaoAdminAdd'

const dataTable = {
  header: [
    { className: 'w-5%', title: 'stt' },
    { className: 'w-20%', title: 'tiêu đề' },
    { className: 'w-20%', title: 'thời gian' },
    { className: '', title: 'nội dung' },
    { className: 'w-20%', title: '' },
  ],
  value: [
    { tieuDe: 'z', thoiGian: 'vo anh tuan 1', noiDung: 'noidung' },
    { tieuDe: 'gv002', thoiGian: 'vo anh tuan 2', noiDung: 'noidung' },
    { tieuDe: 'gv003', thoiGian: 'vo anh tuan 3', noiDung: 'noidung' },
    { tieuDe: 'gv004', thoiGian: 'vo anh tuan 4', noiDung: 'noidung' },
  ],
}

export default function AdminDanhSachThongBao() {
  const [listThongBao, setListThongBao] = useState([])
  const [isShowAddNew, setShowAddNew] = useState(false)

  useEffect(() => {
    fetchListThongBao()
  }, [])

  const fetchListThongBao = () => {
    setListThongBao(dataTable.value)
  }

  const onClickThem = () => {
    setShowAddNew(true)
  }

  const renderBodyTable = () => {
    let arrJsx = listThongBao.map((dt, index) => {
      return (
        <ItemRowTableDanhSachThongBaoAdmin key={index} stt={index} data={dt} />
      )
    })

    isShowAddNew &&
      (arrJsx = [
        ...arrJsx,
        <ItemRowTableDanhSachThongBaoAdminAdd
          key={-1}
          setShowAddNew={setShowAddNew}
        />,
      ])

    return arrJsx
  }
  return (
    <div className='container mx-auto'>
      <Title title='danh sách thông báo' />
      <div>
        <div className='py-2 text-end'>
          {!isShowAddNew && (
            <Button type='add' label='thêm' onClick={onClickThem} />
          )}
        </div>
        <div>
          <Table header={dataTable.header}>{renderBodyTable()}</Table>
        </div>
      </div>
    </div>
  )
}
