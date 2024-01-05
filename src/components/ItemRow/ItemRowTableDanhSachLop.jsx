import React, { useState } from 'react'
import InputCheckbox from '../Input/InputCheckbox'

export default function ItemRowTableDanhSachLop({ dt, index }) {
  const [selectCheckbox, setSelectCheckbox] = useState(dt.chonLopTruong)

  return (
    <tr className='text-center'>
      <td className='border border-primary text-main'>{index + 1}</td>
      <td className='border border-primary text-main'>{dt.soTheSV}</td>
      <td className='border border-primary text-main'>{dt.hoTen}</td>
      <td className='border border-primary text-main'>{dt.sdt}</td>
      <td className='border border-primary text-main'>{dt.email}</td>
      <td className='border border-primary text-main'>{dt.fb}</td>
      <td className='border border-primary text-main'>{dt.diaChi}</td>
      <td className='border border-primary text-main'>
        <InputCheckbox
          value={selectCheckbox}
          onChange={() => {
            setSelectCheckbox(!selectCheckbox)
          }}
        />
      </td>
      <td className='border border-primary text-main underline text-primary cursor-pointer'>
        Xem chi tiết
      </td>
    </tr>
  )
}
