import React, { useState } from 'react'
import Swal from 'sweetalert2'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import InputText from '../Input/InputText'
import Button from '../Button'
import { handleError, requestHandler } from '../../utils'
import { setLoading } from '../../redux/storeSlice'



export default function ItemRowDanhSachHoatDongCongDongAdmin({
  index,
  data,
  refresh,
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [dataHDCD, setDataHDCD] = useState({ ...data })
  const dispatch = useDispatch()
  const navigate = useNavigate()
 
  const onChangeInput = event => {
    const { name, value } = event.target
    setDataHDCD({
      ...dataHDCD,
      [name]: value,
    })
  }

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleSaveClick = async () => {
    try {
      dispatch(setLoading(true))
      const url = `api/CommunityActivityType/UpdateAnnouncement`
      const repsonse = await requestHandler.put(url, dataHDCD)
      const data = await repsonse.data
      toast.success('Cập nhật thành công')
      setIsEditing(false)
      refresh()
    } catch (e) {
      console.error(e)
      handleError(e, navigate)
    } finally {
      dispatch(setLoading(false))
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
        dispatch(setLoading(true))
        const url = `api/CommunityActivityType/DeleteCommunityActivityType`
        const config = { params: { communityActivityTypeId: id } }
        const repsonse = await requestHandler.delete(url, config)
        const data = await repsonse.data
        toast.success('Xoá thành công')
        setIsEditing(false)
        refresh()
      } catch (e) {
        alert(e.message)
      } finally {
        dispatch(setLoading(false))
      }
    }
  }

  const handleCancelButton = () => {
    setDataHDCD({ ...data })
    setIsEditing(false)
  }

  return (
    <tr key={index}>
      <td className='border border-primary p-1 text-center'>{index + 1}</td>
      <td className='border border-primary p-1 text-center'>
        {!isEditing ? (
          data.name
        ) : (
          <InputText
            name='name'
            value={dataHDCD.name}
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
            value={dataHDCD.minScore}
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
            value={dataHDCD.maxScore}
            onChange={onChangeInput}
          />
        )}
      </td>
      <td className='border border-primary p-1 flex gap-3 justify-center'>
        {isEditing ? (
          <Button type='add' label='lưu' onClick={() => handleSaveClick()} />
        ) : (
          <Button type='edit' label='sửa' onClick={() => handleEditClick()} />
        )}
        {isEditing ? (
          <Button
            label='Huỷ'
            onClick={e => handleCancelButton()}
          />
        ) : (
          <Button type='delete' label='Xoá' onClick={e => handleDeleteRow(data.id)} />
        )}
      </td>
    </tr>
  )
}
