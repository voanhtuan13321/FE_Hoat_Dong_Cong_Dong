import React, { useState } from 'react'
import Button from './Button'
import InputText from './InputText'

const initState = {
  tieuDe: '',
  noiDung: '',
}

export default function ItemRowTableDanhSachThongBaoAdminAdd({
  setShowAddNew,
}) {
  const [dataThongBao, setDataThongBao] = useState(initState)

  const onChangeInput = event => {
    const { name, value } = event.target
    setDataThongBao({
      ...dataThongBao,
      [name]: value,
    })
  }

  const onClickLuu = () => {
    console.log(dataThongBao)
  }

  return (
    <tr>
      <td className='border border-primary p-1 text-center'></td>
      <td className='border border-primary p-1 text-center'>
        <InputText
          name='tieuDe'
          value={dataThongBao.tieuDe}
          onChange={onChangeInput}
        />
      </td>
      <td className='border border-primary p-1'></td>
      <td className='border border-primary p-1'>
        <InputText
          name='noiDung'
          value={dataThongBao.noiDung}
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
