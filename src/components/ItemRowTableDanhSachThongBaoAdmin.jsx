import React, { useState } from 'react'
import Button from './Button'
import InputText from './InputText'

export default function ItemRowTableDanhSachThongBaoAdmin({ stt, data }) {
  const [dataEdit, setDataEdit] = useState({ ...data })
  const [isShowEdit, setShowEdit] = useState(false)

  const onClickEdit = () => {
    setShowEdit(true)
  }

  const onClickHuy = () => {
    setShowEdit(false)
    setDataEdit({ ...data })
  }

  const onClickLuu = () => {
    console.log(dataEdit)
  }

  const onChangeInput = event => {
    const { name, value } = event.target
    setDataEdit({
      ...dataEdit,
      [name]: value,
    })
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
              name='tieuDe'
              value={dataEdit.tieuDe}
              onChange={onChangeInput}
            />
          </td>
          <td className='border border-primary p-1 text-main'>
            {data.thoiGian}
          </td>
          <td className='border border-primary p-1 text-center text-main'>
            <InputText
              name='noiDung'
              value={dataEdit.noiDung}
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
          <td className='border border-primary p-1 text-main'>{data.tieuDe}</td>
          <td className='border border-primary p-1 text-main'>
            {data.thoiGian}
          </td>
          <td className='border border-primary p-1 text-main'>
            {data.noiDung}
          </td>
          <td className='border border-primary p-1 text-main'>
            <div className='flex justify-center gap-3'>
              <Button type='edit' label='sửa' onClick={onClickEdit} />
              <Button type='delete' label='xoá' onClick={() => {}} />
            </div>
          </td>
        </tr>
      )}
    </>
  )
}
