import React, { useState } from 'react'
import Button from './Button'
import InputText from './InputText'

export default function ItemRowDanhSachHoatDongCongDongAdmin({
  data,
  index,
  isEdit,
  setAddButtonDisabled,
}) {
  const [isEditing, setIsEditing] = useState(isEdit)
  const [dataHDCD, setDataHDCD] = useState(data)

  const onChangeInput = event => {
    const { name, value } = event.target
    setDataHDCD({
      ...dataHDCD,
      [name]: value,
    })
  }

  const handleSaveClick = () => {
    console.log('save', dataHDCD)
    // Gọi API để lưu dữ liệu với chỉ số index
    setIsEditing(false)
  }

  const handleEditClick = () => {
    setIsEditing(true)
  }
  const handleDeleteRow = () => {
    console.log('delete', dataHDCD)
  }

  const handleCancelButton = () => {
    setDataHDCD(data)
    setAddButtonDisabled ? setAddButtonDisabled(false) : setIsEditing(false)
  }

  return (
    <tr key={index}>
      <td className='border border-primary p-1 text-center'>{index + 1}</td>
      <td className='border border-primary p-1 text-center'>
        {!isEditing ? (
          dataHDCD.loaiHDCD
        ) : (
          <InputText
            name='loaiHDCD'
            value={dataHDCD.loaiHDCD}
            onChange={e => onChangeInput(e)}
          />
        )}
      </td>
      <td className='border border-primary p-1 text-center'>
        {!isEditing ? (
          dataHDCD.minPoint
        ) : (
          <InputText
            name='minPoint'
            value={dataHDCD.minPoint}
            onChange={e => onChangeInput(e)}
          />
        )}
      </td>
      <td className='border border-primary p-1 text-center'>
        {!isEditing ? (
          dataHDCD.maxPoint
        ) : (
          <InputText
            name='maxPoint'
            value={dataHDCD.maxPoint}
            disabled={!isEditing}
            onChange={e => onChangeInput(e)}
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
            type='outline'
            label='Huỷ'
            onClick={e => handleCancelButton()}
          />
        ) : (
          <Button type='delete' label='Xoá' onClick={e => handleDeleteRow()} />
        )}
      </td>
    </tr>
  )
}
