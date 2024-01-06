import React, { useState } from 'react'
import Button from './Button'
import InputText from './InputText'
import toast from 'react-hot-toast'
import { setLoading } from '../redux/storeSlice'
import { handleError, requestHandler } from '../utils'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const initState = { name: '', minScore: '', maxScore: ''}

export default function ItemRowDanhSachHoatDongCongDongAdmin({
  index,
  setAddButtonDisabled,
  refresh
}) {
  const [dataHDCD, setDataHDCD] = useState(initState)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const onChangeInput = event => {
    const { name, value } = event.target
    setDataHDCD({
      ...dataHDCD,
      [name]: value,
    })
  }

  const handleSaveClick = async () => {
    try {
      dispatch(setLoading(true))
      const url = `api/CommunityActivityType/CreateCommunityActivityType`
      const response = await requestHandler.post(url, dataHDCD)
      const data = await response.data
      console.log(data)
      toast.success('Thêm mới thành công')
      setDataHDCD(initState)
      setAddButtonDisabled(false)
      refresh()
    } catch (error) {
      console.error(error)
      handleError(error, navigate)
    } finally {
      dispatch(setLoading(false))
    }
  }

  return (
    <tr key={index}>
      <td className='border border-primary p-1 text-center'>0</td>
      <td className='border border-primary p-1 text-center'>
          <InputText
            name='name'
            value={dataHDCD.name}
            onChange={onChangeInput}
          />
      </td>
      <td className='border border-primary p-1 text-center'>
          <InputText
            name='minScore'
            value={dataHDCD.minScore}
            onChange={onChangeInput}
          />
      </td>
      <td className='border border-primary p-1 text-center'>
          <InputText
            name='maxScore'
            value={dataHDCD.maxScore}
            onChange={onChangeInput}
          />
      </td>
      <td className='border border-primary p-1 flex gap-3 justify-center'>
          <Button type='add' label='lưu' onClick={() => handleSaveClick()} />
          <Button
            type='outline'
            label='Huỷ'
            onClick={() => setAddButtonDisabled(false)}
          />
      </td>
    </tr>
  )
}
