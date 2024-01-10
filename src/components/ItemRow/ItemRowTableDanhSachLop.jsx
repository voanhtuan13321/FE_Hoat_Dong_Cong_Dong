import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import InputCheckbox from '../Input/InputCheckbox'
import DialogDetailCommunityActivityStudent from '../DialogCustom/DialogDetailCommunityActivityStudent'

import {
  COMMUNITY_ACTIVITY_STATUS,
  ROLES,
  callApiUpdateClassPresident,
  checkRoles,
  determineActivityOutcome,
  getUserRole,
  handleError,
} from '../../utils'

export default function ItemRowTableDanhSachLop({
  dt,
  index,
  classPresidentId,
  refresh,
  refresh2,
}) {
  const [isShowDialog, setShowDialog] = useState(false)
  const navigate = useNavigate()
  const determineActivity = determineActivityOutcome(
    dt.sumScoreClassPresidentConfirmed,
    dt.sumScoreHeadTeacherConfirmed,
    dt.sumScoreMajorHeadConfirmed,
  )

  const changeClassPresident = async () => {
    try {
      const dataRequest = { classId: dt.classId, classPresidentId: dt.id }
      // console.log(dataRequest)
      const data = await callApiUpdateClassPresident(dataRequest)
      // console.log(data)
      refresh()
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
      <td className='border border-primary text-main p-2 text-left'>
        {dt.phone}
      </td>
      <td className='border border-primary text-main p-2 text-left'>
        {dt.email}
      </td>
      <td className='border border-primary text-main p-2 text-left'>
        {determineActivity.status ===
          COMMUNITY_ACTIVITY_STATUS.headTeacherConfirmed && (
          <span className='text-red-500'>Giáo viên đã duyệt</span>
        )}

        {determineActivity.status ===
          COMMUNITY_ACTIVITY_STATUS.majorHeadConfirmed && (
          <span className='text-green-500'>Trưởng khoa đã duyệt</span>
        )}
      </td>
      <td className='border border-primary text-main p-2 text-center'>
        {determineActivity.score}
      </td>
      {checkRoles(getUserRole(), [ROLES.giaoVien, ROLES.truongKhoa]) && (
        <td className='border border-primary text-main p-2'>
          <InputCheckbox
            value={classPresidentId === dt.id}
            onChange={changeClassPresident}
          />
        </td>
      )}
      {checkRoles(getUserRole(), [
        ROLES.lopTruong,
        ROLES.giaoVien,
        ROLES.truongKhoa,
      ]) && (
        <td className='border border-primary text-main p-2 underline text-primary cursor-pointer'>
          <span onClick={() => setShowDialog(true)}>Xem chi tiết</span>
          <DialogDetailCommunityActivityStudent
            userId={dt.id}
            isShowDialog={isShowDialog}
            setShowDialog={setShowDialog}
            studentName={`${dt.firstName} ${dt.lastName}`}
            refresh={refresh}
            refresh2={refresh2}
          />
        </td>
      )}
    </tr>
  )
}
