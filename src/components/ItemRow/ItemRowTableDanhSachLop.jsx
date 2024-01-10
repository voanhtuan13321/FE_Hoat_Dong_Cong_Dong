import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import InputCheckbox from '../Input/InputCheckbox'
import DialogDetailCommunityActivityStudent from '../DialogCustom/DialogDetailCommunityActivityStudent'

import {
  COMMUNITY_ACTIVITY_APPROVAL_PERIOD,
  COMMUNITY_ACTIVITY_APPROVAL_PERIOD_STATUS,
  COMMUNITY_ACTIVITY_STATUS,
  ROLES,
  callApiGetSettings,
  callApiUpdateClassPresident,
  checkRoles,
  determineActivityOutcome,
  getUserRole,
  handleError,
} from '../../utils'

export default function ItemRowTableDanhSachLop({ dt, index, classPresidentId, refreshClass, refreshStudent, year }) {
  const [isShowDialog, setShowDialog] = useState(false)
  const [setting, setSetting] = useState({})
  const navigate = useNavigate()
  const determineActivity = determineActivityOutcome(
    dt.sumScoreClassPresidentConfirmed,
    dt.sumScoreHeadTeacherConfirmed,
    dt.sumScoreMajorHeadConfirmed,
  )

  useEffect(() => {
    fetchSettings(COMMUNITY_ACTIVITY_APPROVAL_PERIOD)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

  const changeClassPresident = async () => {
    try {
      const dataRequest = { classId: dt.classId, classPresidentId: dt.id }
      // console.log(dataRequest)
      const data = await callApiUpdateClassPresident(dataRequest)
      // console.log(data)
      refreshClass()
    } catch (error) {
      console.error(error)
      handleError(error, navigate)
    }
  }

  return (
    <tr className='text-center'>
      <td className='border border-primary text-main p-2'>{index + 1}</td>
      <td className='border border-primary text-main p-2'>{dt.studentId}</td>
      <td className='border border-primary text-main p-2 text-left'>{`${dt.firstName} ${dt.lastName}`}</td>
      <td className='border border-primary text-main p-2 text-left'>{dt.phone}</td>
      <td className='border border-primary text-main p-2 text-left'>{dt.email}</td>
      {checkRoles(getUserRole(), [ROLES.GIAO_VIEN, ROLES.TRUONG_KHOA]) && (
        <td className='border border-primary text-main p-2'>
          <InputCheckbox value={classPresidentId === dt.id} onChange={changeClassPresident} />
        </td>
      )}
      {checkRoles(getUserRole(), [ROLES.LOP_TRUONG, ROLES.GIAO_VIEN, ROLES.TRUONG_KHOA]) && (
        <>
          <td className='border border-primary text-main p-2 text-left'>
            {determineActivity.status === COMMUNITY_ACTIVITY_STATUS.HEAD_TEACHER_CONFIRMED && (
              <span className='text-red-500'>Giáo viên đã duyệt</span>
            )}

            {determineActivity.status === COMMUNITY_ACTIVITY_STATUS.MAJOR_HEAD_CONFIRMED && (
              <span className='text-green-500'>Trưởng khoa đã duyệt</span>
            )}
          </td>
          <td className='border border-primary text-main p-2 text-center'>{determineActivity.score}</td>
          <td className='border border-primary text-main p-2 underline text-primary cursor-pointer'>
            <span onClick={() => setShowDialog(true)}>Xem chi tiết</span>
            <DialogDetailCommunityActivityStudent
              userId={dt.id}
              isShowDialog={isShowDialog}
              setShowDialog={setShowDialog}
              studentName={`${dt.firstName} ${dt.lastName}`}
              refreshStudent={refreshStudent}
              year={year}
            />
          </td>
        </>
      )}
    </tr>
  )
}
