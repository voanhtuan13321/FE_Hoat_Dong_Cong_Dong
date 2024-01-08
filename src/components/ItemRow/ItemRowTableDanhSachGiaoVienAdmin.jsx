import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import Button from '../Button'
import InputCheckbox from '../Input/InputCheckbox'
import DialogCreateUserTeacher from '../DialogCustom/DialogCreateUserTeacher'
import DialogChangePassword from '../DialogCustom/DialogChangePassword'
import { useNavigate } from 'react-router-dom'
import { STATUS_USER, callApiUpdateUserStatus, handleError } from '../../utils'

export default function ItemRowTableDanhSachGiaoVienAdmin({ stt, data }) {
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
      // console.log(data)
      setUser(data)
    } catch (error) {
      console.error(error)
      handleError(error, navigate)
    }
  }

  const revertStatus = status => {
    return status === STATUS_USER.ACCOUNT_LOCKED
      ? STATUS_USER.ACCOUNT_UNLOCK
      : STATUS_USER.ACCOUNT_LOCKED
  }
  return (
    <tr>
      <td className='border border-primary p-1 text-center'>
        {stt + 1}{' '}
        <DialogChangePassword
          userId={user.id}
          isShowDialog={isShowDialog}
          setShowDialog={setShowDialog}
        />
      </td>
      <td className='border border-primary p-1 text-center'>
        {data.teacherId}
      </td>
      <td className='border border-primary p-1'>
        {data.firstName + ' ' + data.lastName}
      </td>
      <td className='border border-primary p-1 text-center'>
        <Button type='edit' label='sửa' onClick={() => setShowDialog(true)} />
      </td>
      <td className='border border-primary p-1 text-center'>
        <InputCheckbox
          value={user.status === STATUS_USER.ACCOUNT_LOCKED}
          onClick={changeStatusAccountUser}
          onChange={() => {}}
        />
      </td>
    </tr>
  )
}
