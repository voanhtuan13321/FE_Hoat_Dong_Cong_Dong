import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import DialogCustom from '.'
import Button from '../Button'
import ItemRowNoData from '../ItemRow/ItemRowNoData'
import ItemRowTableDetailHoatDong from '../ItemRow/ItemRowTableDetailHoatDong'
import Table from '../Table'

import {
  ROLES,
  callApiApproveUserCommunityActivitiesByHeadTeacher,
  callApiGetUserCommunityActivities,
  checkRoles,
  checkRoles2,
  generateAcademyYearOptions,
  getUserRole,
  handleError,
} from '../../utils'
import Swal from 'sweetalert2'

export default function DialogDetailCommunityActivityStudent({
  userId,
  isShowDialog,
  setShowDialog,
  studentName,
  refresh,
  refresh2,
}) {
  const role = useSelector(state => state.role)
  const academyYearOptions = generateAcademyYearOptions()

  const [communityActivities, setCommunityActivities] = useState([])
  const [selectedAcademyYear, setSelectedAcademyYear] = useState(
    academyYearOptions[0],
  )
  const navigate = useNavigate()

  useEffect(() => {
    fetchCommunityActivities()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchCommunityActivities = async () => {
    if (!userId) return

    try {
      const data = await callApiGetUserCommunityActivities(
        userId,
        selectedAcademyYear.value,
      )
      // console.log(data)
      setCommunityActivities(data)
    } catch (error) {
      console.error(error)
      handleError(error, navigate)
    }
  }

  const genHeaderByRole = () => {
    const header = [
      { className: 'w-5%', title: 'stt' },
      { className: 'w-10%', title: 'loại hoạt động' },
      { className: 'w-20%', title: 'tên hoạt động' },
      { className: 'w-5%', title: 'khung điểm' },
      { className: 'w-5%', title: 'điểm tự đánh giá' },
      { className: 'w-5%', title: 'điểm ban cán sự đánh giá' },
      { className: '', title: 'link minh chứng' },
    ]
    if (checkRoles2([ROLES.giaoVien, ROLES.truongKhoa], [role])) {
      return [...header, { className: 'w-5%', title: 'xác nhận' }]
    }
    return [...header, { className: 'w-10%', title: '' }]
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
            refresh2={refresh2}
            academyYear={selectedAcademyYear.value}
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
        const data = await callApiApproveUserCommunityActivitiesByHeadTeacher(
          userId,
          new Date().getFullYear(),
        )
        refresh()
        refresh2()
      } catch (error) {
        console.error(error)
        handleError(error, navigate)
      }
    }
  }

  return (
    <DialogCustom
      isOpen={isShowDialog}
      title={`chi tiết hoạt động cộng đồng của sinh viên ${studentName}`}
    >
      <div className='mx-auto w-[1600px]'>
        <div>
          <div className='my-2'>
            <Table header={genHeaderByRole()}>{renderBodyTable()}</Table>
          </div>
        </div>
        <div className='col-span-2 mt-4 flex justify-end gap-2'>
          <Button
            label='Huỷ'
            type='outline'
            onClick={() => setShowDialog(false)}
          />
          {checkRoles(getUserRole(), [ROLES.giaoVien, ROLES.truongKhoa]) && (
            <Button label='xác nhận toàn bộ' onClick={handleAcceptAll} />
          )}
        </div>
      </div>
    </DialogCustom>
  )
}
