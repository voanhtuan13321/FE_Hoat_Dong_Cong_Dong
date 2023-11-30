import React, { useState } from 'react'
import Button from './Button'
import InputText from './InputText'

const initState = {
  khoa: '',
  ten: '',
}

export default function ItemRowTableDanhSachKhoaAdminAdd({ setShowAddNew }) {
  const [dataKhoa, setDataKhoa] = useState(initState)

  const onChangeInput = event => {
    const { name, value } = event.target
    setDataKhoa({
      ...dataKhoa,
      [name]: value,
    })
  }

  const onClickLuu = () => {
    console.log(dataKhoa)
  }

  return (
    <tr>
      <td className='border border-primary p-1 text-center'></td>
      <td className='border border-primary p-1 text-center'>
        <InputText name='khoa' value={dataKhoa.khoa} onChange={onChangeInput} />
      </td>
      <td className='border border-primary p-1'>
        <InputText name='ten' value={dataKhoa.ten} onChange={onChangeInput} />
      </td>
      <td className='border border-primary p-1 flex'>
        <div className='w-50% flex justify-center'>
          <Button label='lưu' onClick={onClickLuu} />
        </div>
        <div className='w-50% flex justify-center'>
          <Button
            label='huỷ'
            type='outline'
            onClick={() => setShowAddNew(false)}
          />
        </div>
      </td>
    </tr>
  )
}
