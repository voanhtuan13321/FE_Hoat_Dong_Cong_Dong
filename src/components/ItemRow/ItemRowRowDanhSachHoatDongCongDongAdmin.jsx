import React, { useState } from 'react'
import Swal from 'sweetalert2'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import InputText from '../Input/InputText'
import Button from '../Button'

import {
  caculateIndex,
  callApiUpdateCommunityActivityType,
  callApiDeleteCommunityActivityType,
  handleError,
} from '../../utils'

export default function ItemRowDanhSachHoatDongCongDongAdmin({
  index,
  data,
  refresh,
  listCommunityActivity,
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [dataCommunityActivity, setDataCommunityActivity] = useState({
    ...data,
  })
  const navigate = useNavigate()

  const onChangeInput = event => {
    const { name, value } = event.target
    setDataCommunityActivity({ ...dataCommunityActivity, [name]: value })
  }

  const handleSaveClick = async () => {
    try {
      const data = await callApiUpdateCommunityActivityType(
        dataCommunityActivity,
      )
      toast.success('Cập nhật thành công')
      setIsEditing(false)
      refresh()
    } catch (e) {
      console.error(e)
      handleError(e, navigate)
    }
  }

  const handleDeleteRow = async id => {
    const { isDenied } = await Swal.fire({
      title: 'Bạn có chắc muốn xoá?',
      showCancelButton: true,
      cancelButtonText: 'Huỷ',
      showDenyButton: true,
      denyButtonText: 'Xoá',
      showConfirmButton: false,
    })

    if (isDenied) {
      try {
        const data = await callApiDeleteCommunityActivityType(id)
        toast.success('Xoá thành công')
        setIsEditing(false)
        refresh()
      } catch (e) {
        console.error(e)
        handleError(e, navigate)
      }
    }
  }

  const handleCancelButton = () => {
    setDataCommunityActivity({ ...data })
    setIsEditing(false)
  }

  return (
    <tr>
      <td className='border border-primary p-1 text-center text-main'>
        {caculateIndex(listCommunityActivity, index)}
      </td>
      <td className='border border-primary p-1 text-main'>
        {!isEditing ? (
          data.name
        ) : (
          <InputText
            name='name'
            value={dataCommunityActivity.name}
            onChange={onChangeInput}
          />
        )}
      </td>
      <td className='border border-primary p-1 text-center'>
        {!isEditing ? (
          data.minScore
        ) : (
          <InputText
            name='minScore'
            value={dataCommunityActivity.minScore}
            onChange={onChangeInput}
          />
        )}
      </td>
      <td className='border border-primary p-1 text-center'>
        {!isEditing ? (
          data.maxScore
        ) : (
          <InputText
            name='maxScore'
            value={dataCommunityActivity.maxScore}
            onChange={onChangeInput}
          />
        )}
      </td>
      <td className='border border-primary p-1 flex gap-3 justify-center'>
        {isEditing ? (
          <Button type='add' label='lưu' onClick={() => handleSaveClick()} />
        ) : (
          <Button type='edit' label='sửa' onClick={() => setIsEditing(true)} />
        )}
        {isEditing ? (
          <Button label='Huỷ' onClick={e => handleCancelButton()} />
        ) : (
          <Button
            type='delete'
            label='Xoá'
            onClick={() => handleDeleteRow(data.id)}
          />
        )}
      </td>
    </tr>
  )
}
