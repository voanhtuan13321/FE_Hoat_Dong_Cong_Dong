import { useNavigate } from 'react-router-dom'

import InputCheckbox from '../Input/InputCheckbox'
import DialogDetailCommunityActivityStudent from '../DialogCustom/DialogDetailCommunityActivityStudent'

import {
  ROLES,
  callApiUpdateClassPresident,
  checkRoles,
  getUserRole,
  handleError,
} from '../../utils'
import { useState } from 'react'

export default function ItemRowTableDanhSachLop({
  dt,
  index,
  classPresidentId,
  refresh,
}) {
  const [isShowDialog, setShowDialog] = useState(false)
  const navigate = useNavigate()

  const changeClassPresident = async () => {
    try {
      const dataRequest = {
        classId: dt.classId,
        classPresidentId: dt.id,
      }
      // console.log(dataRequest)
      const data = await callApiUpdateClassPresident(dataRequest)
      // console.log(data)
      refresh()
    } catch (error) {
      console.error(error)
      handleError(error, navigate)
    }
  }

  const onClickDetails = () => {
    setShowDialog(true)
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
        {dt.facebook}
      </td>
      <td className='border border-primary text-main p-2 text-left'>
        {`${dt.street || ''} ${dt.ward || ''} ${dt.district || ''} ${
          dt.city || ''
        }`}
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
          <span onClick={onClickDetails}>Xem chi tiết</span>
          <DialogDetailCommunityActivityStudent
            userId={dt.id}
            isShowDialog={isShowDialog}
            setShowDialog={setShowDialog}
          />
        </td>
      )}
    </tr>
  )
}
