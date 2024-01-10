import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'

import DialogCustom from '.'
import Button from '../Button'
import ItemRowNoData from '../ItemRow/ItemRowNoData'
import ItemRowTableDetailHoatDong from '../ItemRow/ItemRowTableDetailHoatDong'
import Table from '../Table'

import {
  COMMUNITY_ACTIVITY_APPROVAL_PERIOD,
  COMMUNITY_ACTIVITY_APPROVAL_PERIOD_STATUS,
  ROLES,
  callApiApproveUserCommunityActivitiesByHeadTeacher,
  callApiGetSettings,
  callApiGetUserCommunityActivities,
  checkRoles,
  checkRoles2,
  generateAcademyYearOptions,
  getUserRole,
  handleError,
} from '../../utils'

export default function DialogDetailCommunityActivityStudent({
  userId,
  isShowDialog,
  setShowDialog,
  studentName,
  refreshStudent,
  year,
  students,
}) {
  const role = useSelector(state => state.role)
  const academyYearOptions = generateAcademyYearOptions()
  console.log('render')

  const [setting, setSetting] = useState({})
  const [communityActivities, setCommunityActivities] = useState([])
  const [selectedAcademyYear, setSelectedAcademyYear] = useState(academyYearOptions[0])
  const navigate = useNavigate()

  useEffect(() => {
    fetchSettings(COMMUNITY_ACTIVITY_APPROVAL_PERIOD)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    fetchCommunityActivities()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, year, students])

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

  const fetchCommunityActivities = async () => {
    if (userId) {
      try {
        const data = await callApiGetUserCommunityActivities(userId, year)
        // console.log(data)
        setCommunityActivities(data)
      } catch (error) {
        console.error(error)
        handleError(error, navigate)
      }
    }
  }

  const genHeaderByRole = () => {
    const baseHeader = [
      { className: 'w-5%', title: 'stt' },
      { className: 'w-25%', title: 'loại hoạt động' },
      { className: 'w-25%', title: 'tên hoạt động' },
      { className: 'w-5%', title: 'khung điểm' },
      { className: 'w-5%', title: 'điểm tự đánh giá' },
      { className: 'w-5%', title: 'điểm ban cán sự đánh giá' },
      { className: '', title: 'link minh chứng' },
    ]

    const additionalHeader = checkRoles2([ROLES.GIAO_VIEN, ROLES.TRUONG_KHOA], [role])
      ? [
          { className: 'w-5%', title: 'xác nhận' },
          { className: 'w-5%', title: 'từ chối' },
        ]
      : [{ className: 'w-10%', title: '' }]

    return [...baseHeader, ...additionalHeader]
  }

  const renderBodyTable = () => {
    return communityActivities.length === 0
      ? [<ItemRowNoData key={-1} colSpan={10} />]
      : communityActivities.map((data, index) => (
          <ItemRowTableDetailHoatDong
            key={index}
            index={index}
            data={data}
            refresh={fetchCommunityActivities}
            refreshStudent={refreshStudent}
            academyYear={year}
          />
        ))
  }

  const handleAcceptAll = async () => {
    const { isConfirmed } = await Swal.fire({
      title: 'Bạn có chắc là muốn xác nhận',
      icon: 'info',
      confirmButtonText: 'Xác nhận',
      showCancelButton: true,
      cancelButtonText: 'huỷ',
    })

    if (isConfirmed) {
      try {
        const data = await callApiApproveUserCommunityActivitiesByHeadTeacher(userId, new Date().getFullYear())
        fetchCommunityActivities()
      } catch (error) {
        console.error(error)
        handleError(error, navigate)
      }
    }
  }

  const genCanhBao = () => {
    const userRole = getUserRole()

    if (
      (checkRoles(userRole, [ROLES.GIAO_VIEN]) &&
        setting.status !== COMMUNITY_ACTIVITY_APPROVAL_PERIOD_STATUS.HEAD_TEACHER) ||
      (checkRoles(userRole, [ROLES.LOP_TRUONG]) &&
        setting.status !== COMMUNITY_ACTIVITY_APPROVAL_PERIOD_STATUS.CLASS_PRESIDENT)
    ) {
      return <span className='font-bold text-main text-red-text my-2'>Bạn chưa được phép đánh giá</span>
    }

    return ''
  }

  return (
    <DialogCustom isOpen={isShowDialog} title={`chi tiết hoạt động cộng đồng của sinh viên ${studentName}`}>
      <div className='mx-auto w-[1600px]'>
        <div>
          <div className='my-2'>
            <Table header={genHeaderByRole()}>{renderBodyTable()}</Table>
          </div>
        </div>
        <div className='col-span-2 mt-4 flex justify-end gap-2'>
          {genCanhBao()}
          <Button label='Huỷ' type='outline' onClick={() => setShowDialog(false)} />
          {checkRoles(getUserRole(), [ROLES.GIAO_VIEN, ROLES.TRUONG_KHOA]) &&
            setting.status === COMMUNITY_ACTIVITY_APPROVAL_PERIOD_STATUS.HEAD_TEACHER && (
              <Button label='xác nhận toàn bộ' onClick={handleAcceptAll} />
            )}
        </div>
      </div>
    </DialogCustom>
  )
}
