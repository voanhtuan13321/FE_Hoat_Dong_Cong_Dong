import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import Button from '../Button'
import InputText from '../Input/InputText'

import { callApiCreateCommunityActivityType, handleError } from '../../utils'

const initState = { name: '', minScore: '', maxScore: ''}

export default function ItemRowDanhSachHoatDongCongDongAdmin({
  setAddButtonDisabled,
  refresh,
}) {
  const [dataCommunityActivity, setDataCommunityActivity] = useState(initState)
  const navigate = useNavigate()

  const onChangeInput = event => {
    const { name, value } = event.target
    setDataCommunityActivity({
      ...dataCommunityActivity,
      [name]: value,
    })
  }

  const handleSaveClick = async () => {
    try {
      const data = await callApiCreateCommunityActivityType(dataCommunityActivity)
      toast.success('Thêm mới thành công')
      setDataCommunityActivity(initState)
      setAddButtonDisabled(false)
      refresh()
    } catch (error) {
      console.error(error)
      handleError(error, navigate)
    }
  }

  return (
    <tr>
      <td className='border border-primary p-1 text-center'>0</td>
      <td className='border border-primary p-1 text-center'>
          <InputText
            name='name'
            value={dataCommunityActivity.name}
            onChange={onChangeInput}
          />
      </td>
      <td className='border border-primary p-1 text-center'>
          <InputText
            name='minScore'
            value={dataCommunityActivity.minScore}
            onChange={onChangeInput}
          />
      </td>
      <td className='border border-primary p-1 text-center'>
          <InputText
            name='maxScore'
            value={dataCommunityActivity.maxScore}
            onChange={onChangeInput}
          />
      </td>
      <td className='border border-primary p-1 flex gap-3 justify-center'>
          <Button type='add' label='lưu' onClick={handleSaveClick} />
          <Button
            type='outline'
            label='Huỷ'
            onClick={() => setAddButtonDisabled(false)}
          />
      </td>
    </tr>
  )
}
