import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

import Button from '../Button'
import InputCheckbox from '../Input/InputCheckbox'
import DialogChangePassword from '../DialogCustom/DialogChangePassword'

import {
  STATUS_USER,
  callApiDeleteUser,
  callApiUpdateUserStatus,
  handleError,
} from '../../utils'

export default function ItemRowTableDanhSachGiaoVienAdmin({
  stt,
  data,
  refresh,
}) {
  const [isShowDialog, setShowDialog] = useState(false)
  const [user, setUser] = useState(data)
  const navigate = useNavigate()

  useEffect(() => {
    setUser(data)
  }, [data])

  const changeStatusAccountUser = async () => {
    try {
      const dataRequest = { userId: user.id, status: revertStatus(user.status) }
      const data = await callApiUpdateUserStatus(dataRequest)
      setUser(data)
    } catch (error) {
      console.error(error)
      handleError(error, navigate)
    }
  }

  const revertStatus = status =>
    status === STATUS_USER.ACCOUNT_LOCKED
      ? STATUS_USER.ACCOUNT_UNLOCK
      : STATUS_USER.ACCOUNT_LOCKED

  const handleDelete = async () => {
    const { isDenied } = await Swal.fire({
      title: 'Bạn có chắc muốn xoá không?',
      showConfirmButton: false,
      showDenyButton: true,
      denyButtonText: 'Xoá',
      showCancelButton: true,
      cancelButtonText: 'Huỷ',
    })

    if (isDenied) {
      try {
        const data = await callApiDeleteUser(user.id)
        refresh()
      } catch (error) {
        console.error(error)
        handleError(error, navigate)
      }
    }
  }

  return (
    <tr>
      <td className='border border-primary p-1 text-center text-main'>
        {stt + 1}
        <DialogChangePassword
          userId={user.id}
          isShowDialog={isShowDialog}
          setShowDialog={setShowDialog}
        />
      </td>
      <td className='border border-primary p-1 text-center text-main'>
        {data.teacherId}
      </td>
      <td className='border border-primary p-1 text-main'>
        {data.firstName + ' ' + data.lastName}
      </td>
      <td className='border border-primary px-1 text-center'>
        <Button type='edit' label='sửa' onClick={() => setShowDialog(true)} />
      </td>
      <td className='border border-primary px-1 text-center'>
        <Button type='delete' label='xoá' onClick={handleDelete} />
      </td>
      <td className='border border-primary p-1 text-center'>
        <InputCheckbox
          value={user.status === STATUS_USER.ACCOUNT_LOCKED}
          onClick={changeStatusAccountUser}
        />
      </td>
    </tr>
  )
}
