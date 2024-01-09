import React, { useEffect, useState } from 'react'
import Table from '../components/Table'
import Title from '../components/Title'
import Button from '../components/Button'
import ItemRowTableDanhSachGiaoVienAdmin from '../components/ItemRow/ItemRowTableDanhSachGiaoVienAdmin'
import ItemRowTableDanhSachGiaoVienAdminAdd from '../components/ItemRow/ItemRowTableDanhSachGiaoVienAdminAdd'
import { checkAndHandleLogined } from '../utils'
import { useNavigate } from 'react-router-dom'

const dataTable = {
  header: [
    { className: 'w-5%', title: 'stt' },
    { className: 'w-20%', title: 'mã giáo viên' },
    { className: '', title: 'họ và tên' },
    { className: 'w-20%', title: 'đổi mật khẩu' },
    { className: 'w-20%', title: 'khoá tài khoản' },
  ],
  value: [
    { maGiaoVien: 'gv001', hoVaTen: 'vo anh tuan 1', disabled: true },
    { maGiaoVien: 'gv002', hoVaTen: 'vo anh tuan 2', disabled: false },
    { maGiaoVien: 'gv003', hoVaTen: 'vo anh tuan 3', disabled: true },
    { maGiaoVien: 'gv004', hoVaTen: 'vo anh tuan 4', disabled: false },
  ],
}

export default function AdminDanhSachGiaoVien() {
  const [listGiaoVien, setListGiaoVien] = useState([])
  const [isShowAddNew, setShowAddNew] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    checkAndHandleLogined(navigate)
    fetchListGiaoVien()
  }, [])

  const fetchListGiaoVien = () => {
    setListGiaoVien(dataTable.value)
  }

  const onClickThem = () => {
    setShowAddNew(true)
  }

  const renderBodyTable = () => {
    let arrJsx = listGiaoVien.map((dt, index) => {
      return (
        <ItemRowTableDanhSachGiaoVienAdmin key={index} stt={index} data={dt} />
      )
    })

    isShowAddNew &&
      (arrJsx = [
        ...arrJsx,
        <ItemRowTableDanhSachGiaoVienAdminAdd
          key={-1}
          setShowAddNew={setShowAddNew}
        />,
      ])

    return arrJsx
  }

  return (
    <div className='container mx-auto'>
      <Title title='danh sách giao viên' />
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
