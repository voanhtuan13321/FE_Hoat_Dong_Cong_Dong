import React, { useState } from 'react'
import Button from './Button'
import InputText from './InputText'
import { format } from 'date-fns'
import { useDispatch } from 'react-redux'
import { setLoading } from '../redux/storeSlice'
import { handleError, requestHandler } from '../utils'
import toast from 'react-hot-toast'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

export default function ItemRowTableDanhSachThongBaoAdmin({
  stt,
  data,
  refresh,
}) {
  const [dataEdit, setDataEdit] = useState({ ...data })
  const [isShowEdit, setShowEdit] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onClickEdit = () => {
    setShowEdit(true)
  }

  const onClickHuy = () => {
    setShowEdit(false)
    setDataEdit({ ...data })
  }

  const onClickLuu = async () => {
    try {
      dispatch(setLoading(true))
      const url = `api/Announcement/UpdateAnnouncement`
      const repsonse = await requestHandler.put(url, dataEdit)
      const data = await repsonse.data
      toast.success('Cập nhật thành công')
      setShowEdit(false)
      refresh()
    } catch (e) {
      console.error(e)
      handleError(e, navigate)
    } finally {
      dispatch(setLoading(false))
    }
  }

  const onClickXoa = async id => {
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
        const url = `api/Announcement/DeleteAnnouncement`
        const config = { params: { announcementId: id } }
        const repsonse = await requestHandler.delete(url, config)
        const data = await repsonse.data
        toast.success('Xoá thành công')
        setShowEdit(false)
        refresh()
      } catch (e) {
        alert(e.message)
      } finally {
        dispatch(setLoading(false))
      }
    }
  }

  const onChangeInput = event => {
    const { name, value } = event.target
    setDataEdit({ ...dataEdit, [name]: value })
  }

  return (
    <>
      {isShowEdit ? (
        <tr>
          <td className='border border-primary p-1 text-center text-main'>
            {stt + 1}
          </td>
          <td className='border border-primary p-1 text-center text-main'>
            <InputText
              name='title'
              value={dataEdit.title}
              onChange={onChangeInput}
            />
          </td>
          <td className='border border-primary p-1 text-main'>
            {format(new Date(data.createdAt), 'dd/MM/yyyy')}
          </td>
          <td className='border border-primary p-1 text-center text-main'>
            <InputText
              name='content'
              value={dataEdit.content}
              onChange={onChangeInput}
            />
          </td>
          <td className='border border-primary p-1'>
            <div className='flex justify-center gap-3'>
              <Button label='lưu' onClick={onClickLuu} />
              <Button type='outline' label='huỷ' onClick={onClickHuy} />
            </div>
          </td>
        </tr>
      ) : (
        <tr>
          <td className='border border-primary p-1 text-center text-main'>
            {stt + 1}
          </td>
          <td className='border border-primary p-1 text-main'>{data.title}</td>
          <td className='border border-primary p-1 text-main'>
            {format(new Date(data.createdAt), 'dd/MM/yyyy')}
          </td>
          <td className='border border-primary p-1 text-main'>
            {data.content}
          </td>
          <td className='border border-primary p-1 text-main'>
            <div className='flex justify-center gap-3'>
              <Button type='edit' label='sửa' onClick={onClickEdit} />
              <Button
                type='delete'
                label='xoá'
                onClick={() => onClickXoa(data.id)}
              />
            </div>
          </td>
        </tr>
      )}
    </>
  )
}
