import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Button from '../Button'
import InputCheckbox from '../Input/InputCheckbox'
import DialogChangePassword from '../DialogCustom/DialogCreateUserStudent'

import {
  STATUS_USER,
  callApiUpdateClassPresident,
  callApiUpdateUserStatus,
  handleError,
} from '../../utils'

export default function ItemRowDanhSachSinhVienAdmin({
  data,
  index,
  classPresidentId,
  refresh,
}) {
  const [user, setUser] = useState(data)
  const [isShowDialog, setShowDialog] = useState(false)
  const navigate = useNavigate()

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

  const revertStatus = status =>
    status === STATUS_USER.ACCOUNT_LOCKED
      ? STATUS_USER.ACCOUNT_UNLOCK
      : STATUS_USER.ACCOUNT_LOCKED

  const changeClassPresident = async () => {
    try {
      const dataRequest = {
        classId: user.classId,
        classPresidentId: user.id,
      }
      const data = await callApiUpdateClassPresident(dataRequest)
      // console.log(data)
      refresh()
    } catch (error) {
      console.error(error)
      handleError(error, navigate)
    }
  }

  return (
    <tr key={index}>
      <td className='border border-primary p-1 text-center text-main'>
        {++index}
        <DialogChangePassword
          userId={user.id}
          isShowDialog={isShowDialog}
          setShowDialog={setShowDialog}
        />
      </td>
      <td className='border border-primary p-1 text-center text-main'>
        {user.studentId}
      </td>
      <td className='border border-primary px-3 text-main'>{`${user.firstName} ${user.lastName}`}</td>
      <td className='border border-primary p-1 text-center'>
        <Button
          type={'edit'}
          label={'sửa'}
          onClick={() => setShowDialog(true)}
        />
      </td>
      <td className='border border-primary p-1'>
        <InputCheckbox
          value={user.status === STATUS_USER.ACCOUNT_LOCKED}
          onChange={changeStatusAccountUser}
        />
      </td>
      <td className='border border-primary p-1'>
        <InputCheckbox
          value={classPresidentId === user.id}
          onChange={changeClassPresident}
        />
      </td>
    </tr>
  )
}
