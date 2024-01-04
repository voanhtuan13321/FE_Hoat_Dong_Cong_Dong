import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import Button from './Button'
import InputText from './InputText'

import { setLoading } from '../redux/storeSlice'
import { callApiCreateAnnouncement, handleError } from '../utils'

const initState = { title: '', content: '' }

export default function ItemRowTableDanhSachThongBaoAdminAdd({
  setShowAddNew,
  refresh,
}) {
  const [dataThongBao, setDataThongBao] = useState(initState)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onChangeInput = event => {
    const { name, value } = event.target
    setDataThongBao({ ...dataThongBao, [name]: value })
  }

  const onClickLuu = async () => {
    try {
      dispatch(setLoading(true))
      const data = await callApiCreateAnnouncement(dataThongBao)
      // console.log(data)
      toast.success('Thêm mới thành công')
      setDataThongBao(initState)
      setShowAddNew(false)
      refresh()
    } catch (error) {
      console.error(error)
      handleError(error, navigate)
    } finally {
      dispatch(setLoading(false))
    }
  }

  return (
    <tr>
      <td className='border border-primary p-1 text-center'></td>
      <td className='border border-primary p-1 text-center'>
        <InputText
          name='title'
          value={dataThongBao.title}
          onChange={onChangeInput}
        />
      </td>
      <td className='border border-primary p-1'></td>
      <td className='border border-primary p-1'>
        <InputText
          name='content'
          value={dataThongBao.content}
          onChange={onChangeInput}
        />
      </td>
      <td className='border border-primary p-1' colSpan={2}>
        <div className='flex justify-center gap-4'>
          <Button label='lưu' onClick={onClickLuu} />
          <Button
            type='outline'
            label='huỷ'
            onClick={() => setShowAddNew(false)}
          />
        </div>
      </td>
    </tr>
  )
}
