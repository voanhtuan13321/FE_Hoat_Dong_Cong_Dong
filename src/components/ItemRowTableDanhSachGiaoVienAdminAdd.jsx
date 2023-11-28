import React, { useState } from 'react'
import Button from './Button'
import InputText from './InputText'

const initState = {
  maGiaoVien: '',
  hoVaTen: '',
}

export default function ItemRowTableDanhSachGiaoVienAdminAdd({
  setShowAddNew,
}) {
  const [dataGiaoVien, setDataGiaoVien] = useState(initState)

  const onChangeInput = event => {
    const { name, value } = event.target
    setDataGiaoVien({
      ...dataGiaoVien,
      [name]: value,
    })
  }

  const onClickLuu = () => {
    console.log(dataGiaoVien)
  }

  return (
    <tr>
      <td className='border border-primary p-1 text-center'></td>
      <td className='border border-primary p-1 text-center'>
        <InputText
          name='maGiaoVien'
          value={dataGiaoVien.maGiaoVien}
          onChange={onChangeInput}
        />
      </td>
      <td className='border border-primary p-1'>
        <InputText
          name='hoVaTen'
          value={dataGiaoVien.hoVaTen}
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
