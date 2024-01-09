import React, { useEffect, useState } from 'react'
import Table from '../components/Table'
import Title from '../components/Title'
import Button from '../components/Button'
import ItemRowTableDanhSachGiaoVienAdmin from '../components/ItemRow/ItemRowTableDanhSachGiaoVienAdmin'
import {
  ITEM_PER_PAGE,
  callApiGetTeachersPaginationList,
  checkAndHandleLogined,
} from '../utils'
import { useNavigate } from 'react-router-dom'
import DialogCreateUserTeacher from '../components/DialogCustom/DialogCreateUserTeacher'

const dataTable = {
  header: [
    { className: 'w-5%', title: 'stt' },
    { className: 'w-20%', title: 'mã giáo viên' },
    { className: '', title: 'họ và tên' },
    { className: 'w-20%', title: 'đổi mật khẩu' },
    { className: 'w-20%', title: 'khoá tài khoản' },
  ],
}

export default function AdminDanhSachGiaoVien() {
  const [objectTeacher, setObjectTeacher] = useState({})
  const [isShowDialog, setShowDialog] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    checkAndHandleLogined(navigate)
    fetchListGiaoVien()
  }, [])

  const fetchListGiaoVien = async (page = 0) => {
    try {
      const data = await callApiGetTeachersPaginationList(ITEM_PER_PAGE, page)
      setObjectTeacher(data)
      console.log(data)
    } catch (error) {
      alert(error.message)
    }
  }

  const onClickCreateUser = () => {
    setShowDialog(true)
  }

  const renderBodyTable = () => {
    let arrJsx = objectTeacher.data?.map((dt, index) => {
      return (
        <ItemRowTableDanhSachGiaoVienAdmin
          key={index}
          stt={index}
          data={dt}
          refresh={fetchListGiaoVien}
          objectTeacher={objectTeacher}
        />
      )
    })

    return arrJsx
  }

  return (
    <>
      <DialogCreateUserTeacher
        isShowDialog={isShowDialog}
        setShowDialog={setShowDialog}
        refresh={fetchListGiaoVien}
      />
      <div className='container mx-auto'>
        <Title title='danh sách giao viên' />
        <div>
          <div className='py-2 text-end'>
            <Button type='add' label='thêm' onClick={onClickCreateUser} />
          </div>
          <div>
            <Table header={dataTable.header}>{renderBodyTable()}</Table>
          </div>
        </div>
      </div>
    </>
  )
}
