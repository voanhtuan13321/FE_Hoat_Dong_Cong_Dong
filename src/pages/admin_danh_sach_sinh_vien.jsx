import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Table from '../components/Table'
import Title from '../components/Title'
import Button from '../components/Button'
import InputSelect from '../components/Input/InputSelect'
import ItemRowDanhSachSinhVienAdmin from '../components/ItemRow/ItemRowDanhSachSinhVienAdmin'
import DialogCreateUserStudent from '../components/DialogCustom/DialogCreateUserStudent'
import ItemRowNoData from '../components/ItemRow/ItemRowNoData'

import {
  ROLES,
  callApiGetClassesList,
  callApiGetMajorsList,
  callApiGetStudentsListByClassId,
  checkAndHandleLogined,
  checkPermissionToAccessThePage,
  getUserRole,
  handleError,
} from '../utils'

const HEADER_TABLE = [
  { className: 'w-5%', title: 'stt' },
  { className: 'w-15%', title: 'Mã sinh viên' },
  { className: '', title: 'Họ tên' },
  { className: 'w-10%', title: 'Đổi mật khẩu' },
  { className: 'w-10%', title: 'Xoá' },
  { className: 'w-10%', title: 'Khoá tài khoản' },
  { className: 'w-10%', title: 'Chọn lớp trưởng' },
]

export default function AdminDanhSachSinhVien() {
  const [students, setStudents] = useState([])
  const [majorOptions, setMajorOptions] = useState([])
  const [classesOptions, setClassesOptions] = useState([])
  const [selectedMajor, setSelectedMajor] = useState({})
  const [selectedClasse, setSelectedClasse] = useState({})
  const [isShowDialog, setShowDialog] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    checkAndHandleLogined(navigate)
    checkPermissionToAccessThePage(getUserRole(), [ROLES.admin], navigate)
    fetchMajors()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    fetchClasses()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMajor])

  useEffect(() => {
    fetchStudents()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedClasse, selectedMajor])

  const fetchMajors = async () => {
    try {
      const data = await callApiGetMajorsList()
      const result = data.map(item => ({
        ...item,
        value: item.id,
      }))
      // console.log(data)
      setMajorOptions(result)
      setSelectedMajor(result[0])
    } catch (error) {
      console.error(error)
      handleError(error, navigate)
    }
  }

  const fetchClasses = async () => {
    try {
      const data = await callApiGetClassesList()
      const result = data
        .map(item => ({
          ...item,
          value: item.id,
        }))
        .filter(item => item.majorId === selectedMajor.value)
      // console.log(result)
      // console.log(selectedMajor)
      setClassesOptions(result)
      setSelectedClasse(result[0])
      result.length === 0 && setStudents([])
    } catch (error) {
      console.error(error)
      handleError(error, navigate)
    }
  }

  const fetchStudents = async () => {
    const classId = selectedClasse?.id

    if (classId) {
      try {
        const data = await callApiGetStudentsListByClassId(classId)
        console.log(data)
        setStudents(
          data.sort((stu1, stu2) =>
            stu1.studentId.localeCompare(stu2.studentId),
          ),
        )
      } catch (error) {
        console.error(error)
        handleError(error, navigate)
      }
    } else {
      setStudents([])
    }
  }

  const onClickCreateUser = () => {
    if (!selectedClasse) {
      alert('Chưa chọn lớp')
      return
    }
    setShowDialog(true)
  }

  const renderBodyTable = () => {
    return students?.length === 0
      ? [<ItemRowNoData key={-1} colSpan={6} />]
      : students?.map((data, index) => (
          <ItemRowDanhSachSinhVienAdmin
            key={index}
            data={data}
            index={index}
            classPresidentId={selectedClasse?.classPresidentId}
            refresh={fetchClasses}
          />
        ))
  }

  return (
    <>
      <DialogCreateUserStudent
        isShowDialog={isShowDialog}
        setShowDialog={setShowDialog}
        classId={selectedClasse?.id}
        refresh={fetchStudents}
      />

      <div className='container p-2 justify-center m-auto'>
        <div>
          <Title title='danh sách sinh viên' />
        </div>
        <div className='flex items-center justify-between mt-3'>
          <div className='flex items-center gap-2'>
            <span className='font-bold text-primary text-main'>
              Thuộc khoa:
            </span>
            <div className='w-48'>
              <InputSelect
                options={majorOptions}
                value={selectedMajor}
                onChange={setSelectedMajor}
              />
            </div>
            <span className='font-bold text-primary text-main'>Lớp:</span>
            <div className='w-48 flex items-center'>
              {classesOptions.length > 0 ? (
                <div className='w-[300px]'>
                  <InputSelect
                    options={classesOptions}
                    value={selectedClasse}
                    onChange={setSelectedClasse}
                  />
                </div>
              ) : (
                <span className='text-main text-red-500'>
                  Khoa này không có lớp
                </span>
              )}
            </div>
          </div>
          <Button type='add' label='thêm' onClick={onClickCreateUser} />
        </div>
        <div className='my-2'>
          <Table header={HEADER_TABLE}>{renderBodyTable()}</Table>
        </div>
      </div>
    </>
  )
}
