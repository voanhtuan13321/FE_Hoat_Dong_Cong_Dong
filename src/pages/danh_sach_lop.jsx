import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

import Title from '../components/Title'
import Button from '../components/Button'
import InputSelect from '../components/Input/InputSelect'
import Table from '../components/Table'
import ItemRowNoData from '../components/ItemRow/ItemRowNoData'
import ItemRowTableDanhSachLop from '../components/ItemRow/ItemRowTableDanhSachLop'

import {
  COMMUNITY_ACTIVITY_APPROVAL_PERIOD,
  COMMUNITY_ACTIVITY_APPROVAL_PERIOD_STATUS,
  ROLES,
  callApiApproveClassCommunityActivitiesByHeadTeacher,
  callApiGetClassesByTeacherId,
  callApiGetSettings,
  callApiGetStudentsListByClassId,
  callApiGetUserByUserId,
  checkAndHandleLogin,
  checkPermissionToAccessThePage,
  checkRoles,
  generateAcademyYearOptions,
  generateYearOptions,
  getUserId,
  getUserRole,
  handleError,
} from '../utils'

export default function DanhSachLop() {
  const academyYearOptions = generateAcademyYearOptions()

  const [setting, setSetting] = useState({})
  const [students, setStudents] = useState([])
  const [classesOptions, setClassesOptions] = useState([])
  const [selectedClasses, setSelectedClasses] = useState({})
  const [selectedAcademyYear, setSelectedAcademyYear] = useState(academyYearOptions[0])
  const yearOptions = generateYearOptions(selectedAcademyYear.value)
  const [selectedYear, setSelectedYear] = useState(yearOptions[0])
  const navigate = useNavigate()

  useEffect(() => {
    checkAndHandleLogin(navigate)
    checkPermissionToAccessThePage(
      getUserRole(),
      [ROLES.SINH_VIEN, ROLES.LOP_TRUONG, ROLES.GIAO_VIEN, ROLES.TRUONG_KHOA],
      navigate,
    )
    checkPermissionToAccessThePage(getUserRole(), [ROLES.SINH_VIEN, ROLES.GIAO_VIEN], navigate)
    fetchSettings(COMMUNITY_ACTIVITY_APPROVAL_PERIOD)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    fetchClasses()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAcademyYear])

  useEffect(() => {
    const yearOps = generateYearOptions(selectedAcademyYear.value)
    setSelectedYear(yearOps[0])
  }, [selectedClasses])

  useEffect(() => {
    fetchStudents()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedYear])

  const fetchSettings = async name => {
    try {
      const data = await callApiGetSettings(name)
      setSetting(data)
      // console.log(data)
    } catch (error) {
      console.error(error)
      handleError(error, navigate)
    }
  }

  const fetchClasses = async () => {
    const roles = getUserRole()

    if (!checkRoles(roles, [ROLES.GIAO_VIEN])) {
      return
    }

    const userId = getUserId()
    try {
      const data = await callApiGetClassesByTeacherId(userId)
      const result = data
        .map(item => ({ ...item, value: item.id }))
        .filter(item => item?.academicYear === selectedAcademyYear.value)
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

    const classId = checkRoles(roles, [ROLES.SINH_VIEN]) ? user.classId : selectedClasses?.value ?? ''

    if (classId) {
      try {
        const data = await callApiGetStudentsListByClassId(classId, selectedYear.value)
        // console.log('student', data)
        setStudents(data.sort((stu1, stu2) => stu1.studentId.localeCompare(stu2.studentId)))
      } catch (error) {
        console.error(error)
        handleError(error, navigate)
      }
    } else {
      setStudents([])
    }
  }

  const handleAccept = async () => {
    const classId = selectedClasses?.value

    if (!classId) return

    const { isConfirmed } = await Swal.fire({
      title: 'Bạn có chắc muốn xác nhận không',
      icon: 'info',
      confirmButtonText: 'Xác nhận',
      showCancelButton: true,
      cancelButtonText: 'Huỷ',
    })

    if (!isConfirmed) return

    try {
      const data = await callApiApproveClassCommunityActivitiesByHeadTeacher(classId, new Date().getFullYear())
      fetchStudents()
    } catch (error) {
      console.error(error)
      handleError(error, navigate)
    }
  }

  const renderBodyTable = () => {
    if (checkRoles(getUserRole(), [ROLES.GIAO_VIEN, ROLES.TRUONG_KHOA]) && classesOptions.length === 0)
      return [<ItemRowNoData key={-1} colSpan={9} />]

    return students.length === 0
      ? [<ItemRowNoData key={-1} colSpan={9} />]
      : students.map((dt, index) => (
          <ItemRowTableDanhSachLop
            key={index}
            dt={dt}
            index={index}
            classPresidentId={selectedClasses?.classPresidentId}
            refreshClass={fetchClasses}
            refreshStudent={fetchStudents}
            year={selectedYear.value}
          />
        ))
  }

  const genHeaders = () => {
    const header = checkRoles(getUserRole(), [ROLES.GIAO_VIEN, ROLES.TRUONG_KHOA])
      ? [
          { className: 'w-5%', title: 'Chọn lớp trưởng' },
          { className: 'w-10%', title: 'trạng thái' },
          { className: 'w-5%', title: 'Tổng điểm' },
          { className: 'w-5%', title: 'Xem chi tiết' },
        ]
      : checkRoles(getUserRole(), [ROLES.LOP_TRUONG])
        ? [
            { className: 'w-10%', title: 'Xem chi tiết' },
            { className: 'w-10%', title: 'trạng thái' },
            { className: 'w-5%', title: 'Tổng điểm' },
          ]
        : []

    return [
      { className: 'w-5%', title: 'stt' },
      { className: 'w-10%', title: 'Số thẻ sinh viên' },
      { className: 'w-10%', title: 'Tên sinh viên' },
      { className: 'w-10%', title: 'Số điện thoại' },
      { className: 'w-15%', title: 'Email' },

      ...header,
    ]
  }

  return (
    <div className='container mx-auto'>
      <Title title='danh sách lớp' />
      <div className='mt-3'>
        {checkRoles(getUserRole(), [ROLES.GIAO_VIEN, ROLES.TRUONG_KHOA]) && (
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
                  <span className='text-main text-red-500'>Khoá này không có lớp</span>
                ) : (
                  <div className='w-[300px]'>
                    <InputSelect options={classesOptions} value={selectedClasses} onChange={setSelectedClasses} />
                  </div>
                )}
              </div>
              {classesOptions.length === 0 || (
                <>
                  <span className='font-bold text-primary text-main'>Năm học:</span>
                  <div className='w-48'>
                    <InputSelect options={yearOptions} value={selectedYear} onChange={setSelectedYear} />
                  </div>
                </>
              )}
            </div>
            <div className=''>
              {selectedYear.value === new Date().getFullYear() && (
                <>
                  {setting.status === COMMUNITY_ACTIVITY_APPROVAL_PERIOD_STATUS.HEAD_TEACHER ? (
                    <Button label='Xác nhận' type='primary' onClick={handleAccept} />
                  ) : (
                    <span className='font-bold text-main text-red-text my-2'>Bạn chưa được phép đánh giá</span>
                  )}
                </>
              )}
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
