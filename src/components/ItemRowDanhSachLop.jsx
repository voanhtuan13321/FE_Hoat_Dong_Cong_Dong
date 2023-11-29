import React from 'react'
import Button from './Button'

const classList = [
  { name: '18CA1', value: 1 },
  { name: '18CA2', value: 2 },
  { name: '18CA3', value: 3 },
]
const teacherList = [
  { name: 'Nguyễn Văn A', value: 1 },
  { name: 'Nguyễn Văn B', value: 2 },
  { name: 'Nguyễn Văn C', value: 3 },
]
const khoaList = [
  { name: '18CA1', value: 1 },
  { name: '18CA2', value: 2 },
  { name: '18CA3', value: 3 },
]
const namHocList = [
  { name: '18CA1', value: 1 },
  { name: '18CA2', value: 2 },
  { name: '18CA3', value: 3 },
]
export default function ItemRowDanhSachLop({ dt, index, onClickDeleteItem }) {
  return (
    <tr className='text-center'>
      <td className='border border-primary'>{index + 1}</td>
      <td className='border border-primary'>{dt.khoaQuanLy}</td>
      <td className='border border-primary'>{dt.lop}</td>
      <td className='border border-primary'>{dt.giaoVienChuNhiem}</td>
      <td className='border border-primary'>{dt.khoa}</td>
      <td className='border border-primary flex gap-2 justify-center'>
        <Button label='Sửa' type='edit' onClick={() => {}} />
        <Button
          label='Xóa'
          type='delete'
          onClick={() => {
            onClickDeleteItem(index)
          }}
        />
      </td>
    </tr>
  )
}
