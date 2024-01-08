import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import Title from '../components/Title'
import Button from '../components/Button'
import InputSelect from '../components/Input/InputSelect'
import Table from '../components/Table'
import ItemRowNoData from '../components/ItemRow/ItemRowNoData'
import ItemRowTableDanhSachLop from '../components/ItemRow/ItemRowTableDanhSachLop'

import {
  ROLES,
  callApiGetClassesByTeacherId,
  callApiGetStudentsListByClassId,
  callApiGetUserByUserId,
  checkAndHandleLogined,
  checkPermissionToAccessThePage,
  checkRoles,
  generateAcademyYearOptions,
  getUserId,
  getUserRole,
  handleError,
} from '../utils'

export default function DanhSachLop() {
  const academyYearOptions = generateAcademyYearOptions()

  const [students, setStudents] = useState([])
  const [classesOptions, setClassesOptions] = useState([])
  const [selectedClasses, setSelectedClasses] = useState({})
  const [selectedAcademyYear, setSelectedAcademyYear] = useState(
    academyYearOptions[0],
  )
  const navigate = useNavigate()

  useEffect(() => {
    checkAndHandleLogined(navigate)
    checkPermissionToAccessThePage(
      getUserRole(),
      [ROLES.sinhVien, ROLES.giaoVien],
      navigate,
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    fetchClasses()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAcademyYear])

  useEffect(() => {
    fetchStudents()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAcademyYear, selectedClasses])

  const fetchClasses = async () => {
    const roles = getUserRole()
    if (!checkRoles(roles, [ROLES.giaoVien])) {
      return
    }

    const userId = getUserId()
    try {
      const data = await callApiGetClassesByTeacherId(userId)
      const result = data
        .map(item => ({
          ...item,
          value: item.id,
        }))
        .filter(item => item.academicYear === selectedAcademyYear.value)
      setClassesOptions(result)
      setSelectedClasses(result[0])
    } catch (error) {
      console.error(error)
      handleError(error, navigate)
    }
  }

  const fetchStudents = async () => {
    const roles = getUserRole()
    const userId = getUserId()
    if (!userId) return

    const user = await callApiGetUserByUserId(userId)

    const classId = checkRoles(roles, [ROLES.sinhVien])
      ? user.classId
      : selectedClasses?.value ?? ''

    if (classId) {
      try {
        const data = await callApiGetStudentsListByClassId(classId)
        // console.log('student', data)
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

  const handleXacNhan = () => {
    console.log(students)
  }

  const renderBodyTable = () => {
    return students.length === 0
      ? [<ItemRowNoData key={-1} colSpan={9} />]
      : students.map((dt, index) => (
          <ItemRowTableDanhSachLop
            key={index}
            dt={dt}
            index={index}
            classPresidentId={selectedClasses.classPresidentId}
            refresh={fetchClasses}
          />
        ))
  }

  const genHeaders = () => {
    const header = checkRoles(getUserRole(), [ROLES.giaoVien, ROLES.truongKhoa])
      ? [
          { className: 'w-5%', title: 'Chọn lớp trưởng' },
          { className: 'w-5%', title: 'Xem chi tiết' },
        ]
      : checkRoles(getUserRole(), [ROLES.lopTruong])
        ? [{ className: 'w-5%', title: 'Xem chi tiết' }]
        : []

    return [
      { className: 'w-5%', title: 'stt' },
      { className: 'w-10%', title: 'Số thẻ sinh viên' },
      { className: 'w-10%', title: 'Tên sinh viên' },
      { className: 'w-10%', title: 'Số điện thoại' },
      { className: 'w-10%', title: 'Email' },
      { className: 'w-10%', title: 'Facebook' },
      { className: 'w-20%', title: 'Địa chỉ' },
      ...header,
    ]
  }

  return (
    <div className='container mx-auto'>
      <Title title='danh sách lớp' />
      <div className='mt-3'>
        {checkRoles(getUserRole(), [ROLES.giaoVien, ROLES.truongKhoa]) && (
          <div className='flex items-center justify-between gap-2 '>
            <div className='flex items-center gap-2'>
              <span className='font-bold text-primary text-main'>Khoá:</span>
              <div className='w-48'>
                <InputSelect
                  options={academyYearOptions}
                  value={selectedAcademyYear}
                  onChange={setSelectedAcademyYear}
                />
              </div>
              <span className='font-bold text-primary text-main'>Lớp:</span>
              <div className='w-48 flex items-center'>
                {classesOptions.length === 0 ? (
                  <span className='text-main text-red-500'>
                    Khoá này không có lớp
                  </span>
                ) : (
                  <div className='w-[300px]'>
                    <InputSelect
                      options={classesOptions}
                      value={selectedClasses}
                      onChange={setSelectedClasses}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className=''>
              <Button label='Xác nhận' type='primary' onClick={handleXacNhan} />
            </div>
          </div>
        )}
      </div>
      <div className='my-2'>
        <Table header={genHeaders()}>{renderBodyTable()}</Table>
      </div>
    </div>
  )
}
