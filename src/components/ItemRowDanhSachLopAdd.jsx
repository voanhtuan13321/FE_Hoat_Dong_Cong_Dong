import React, { useState } from 'react'
import Button from './Button'
import InputSelect from './InputSelect'

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
  { name: 'K.Cơ Khí', value: 1 },
  { name: 'K.Vật lý', value: 2 },
  { name: 'K.CNTT', value: 3 },
]
const namHocList = [
  { name: '2021', value: 1 },
  { name: '2022', value: 2 },
  { name: '2023', value: 3 },
]
export default function ItemRowDanhSachLopAdd({
  dt,
  index,
  onClickDeleteItem,
}) {
    const [selectKhoa,setSelectKhoa] = useState({})
    const [selectTeacher, setSelectTeacher] = useState({})
    const [selectClass, setSelectClass] = useState({})
    const [selectYear, setSelectYear] = useState({})
  return (
    <tr className='text-center'>
      <td className='border border-primary'>{index + 1}</td>
      <td className='border border-primary'>
        <InputSelect options={khoaList} value={}/>
      </td>
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
