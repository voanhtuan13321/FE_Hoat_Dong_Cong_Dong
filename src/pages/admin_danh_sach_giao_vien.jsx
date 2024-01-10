import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Table from '../components/Table'
import Title from '../components/Title'
import Button from '../components/Button'
import ItemRowTableDanhSachGiaoVienAdmin from '../components/ItemRow/ItemRowTableDanhSachGiaoVienAdmin'
import DialogCreateUserTeacher from '../components/DialogCustom/DialogCreateUserTeacher'

import {
  ITEM_PER_PAGE,
  ROLES,
  callApiGetTeachersPaginationList,
  checkAndHandleLogin,
  checkPermissionToAccessThePage,
  getUserRole,
} from '../utils'

const HEADER_TABLE = [
  { className: 'w-5%', title: 'stt' },
  { className: 'w-20%', title: 'mã giáo viên' },
  { className: '', title: 'họ và tên' },
  { className: 'w-10%', title: 'đổi mật khẩu' },
  { className: 'w-10%', title: 'xoá' },
  { className: 'w-20%', title: 'khoá tài khoản' },
]

export default function AdminDanhSachGiaoVien() {
  const [objectTeacher, setObjectTeacher] = useState({})
  const [isShowDialog, setShowDialog] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    checkAndHandleLogin(navigate)
    checkPermissionToAccessThePage(getUserRole(), [ROLES.ADMIN], navigate)
    fetchTeachers()
  }, [])

  const fetchTeachers = async (page = 0) => {
    try {
      const data = await callApiGetTeachersPaginationList(ITEM_PER_PAGE, page)
      setObjectTeacher(data)
      // console.log(data)
    } catch (error) {
      alert(error.message)
    }
  }

  const renderBodyTable = () => {
    return objectTeacher.data
      ?.sort((item1, item2) => item1.teacherId.localeCompare(item2.teacherId))
      .map((dt, index) => (
        <ItemRowTableDanhSachGiaoVienAdmin
          key={index}
          stt={index}
          data={dt}
          refresh={fetchTeachers}
          objectTeacher={objectTeacher}
        />
      ))
  }

  return (
    <>
      <DialogCreateUserTeacher
        isShowDialog={isShowDialog}
        setShowDialog={setShowDialog}
        refresh={fetchTeachers}
      />
      <div className='container mx-auto py-2'>
        <Title title='danh sách giáo viên' />
        <div>
          <div className='py-2 text-end'>
            <Button
              type='add'
              label='thêm'
              onClick={() => setShowDialog(true)}
            />
          </div>
          <div>
            <Table header={HEADER_TABLE}>{renderBodyTable()}</Table>
          </div>
        </div>
      </div>
    </>
  )
}
