import React, { useState } from 'react'
import Button from './Button'
import InputText from './InputText'

const initState = {
  svid: '',
  name: '',
  passwork: '123456',
  isDeleted: false,
}

export default function ItemAddRowDanhSachSinhVienAdmin({
  index,
  setShowAddNew,
}) {
  const [dataSV, setDataSV] = useState(initState)

  const onChangeInput = event => {
    const { name, value } = event.target
    setDataSV({
      ...dataSV,
      [name]: value,
    })
  }

  const onClickLuu = () => {
    console.log(dataSV)
  }

  return (
    <tr key={index}>
      <td className='border border-primary p-1 text-center'>{dataSV.stt}</td>
      <td className='border border-primary p-1 text-center'>
        <InputText name={'svid'} value={dataSV.svid} onChange={onChangeInput} />
      </td>
      <td className='border border-primary px-3'>
        <InputText name={'name'} value={dataSV.name} onChange={onChangeInput} />
      </td>
      <td className='border border-primary p-1 text-center ' colSpan={2}>
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
