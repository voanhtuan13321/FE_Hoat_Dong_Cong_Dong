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
export default function ItemRowDanhSachLop({ dt, index, onClickDeleteItem }) {
  const [selectKhoa, setSelectKhoa] = useState(dt.khoaQuanLy)
  const [selectTeacher, setSelectTeacher] = useState(dt.giaoVienChuNhiem)
  const [selectClass, setSelectClass] = useState(dt.lop)
  const [selectYear, setSelectYear] = useState(dt.khoa)
  const [isEdit, setIsEdit] = useState(false)
  const [dataEdit, setDataEdit] = useState({ ...dt })
  const handleSave = () => {
    const savedData = {
      khoa: selectKhoa.value,
      lop: selectClass.value,
      giaoVien: selectTeacher.value,
      namHoc: selectYear.value,
    }
    console.log('savedData:', savedData)
  }
  const handleEdit = () => {
    setIsEdit(true)
  }
  const onClickHuy = () => {
    setIsEdit(false)
    setDataEdit({ ...dt })
  }
  return (
    <>
      {!isEdit ? (
        <tr className='text-center' key={index}>
          <td className='border border-primary'>{index + 1}</td>
          <td className='border border-primary'>{dt.khoaQuanLy}</td>
          <td className='border border-primary'>{dt.lop}</td>
          <td className='border border-primary'>{dt.giaoVienChuNhiem}</td>
          <td className='border border-primary'>{dt.khoa}</td>
          <td className='border border-primary flex gap-2 justify-center'>
            <Button label='Sửa' type='edit' onClick={handleEdit} />
            <Button
              label='Xóa'
              type='delete'
              onClick={() => {
                onClickDeleteItem(index)
              }}
            />
          </td>
        </tr>
      ) : (
        <tr className='text-center' key={index}>
          <td className='border border-primary'>{index + 1}</td>
          <td className='border border-primary'>
            <InputSelect
              name='selectKhoa'
              options={khoaList}
              value={selectKhoa}
              onChange={setSelectKhoa}
            />
          </td>
          <td className='border border-primary'>
            <InputSelect
              name='selectClass'
              options={classList}
              value={selectClass}
              onChange={setSelectClass}
            />
          </td>
          <td className='border border-primary'>
            <InputSelect
              name='selectTeacher'
              options={teacherList}
              value={selectTeacher}
              onChange={setSelectTeacher}
            />
          </td>
          <td className='border border-primary'>
            <InputSelect
              name='selectYear'
              options={namHocList}
              value={selectYear}
              onChange={setSelectYear}
            />
          </td>
          <td className='border border-primary flex gap-2 justify-center'>
            <Button label='Lưu' type='add' onClick={handleSave} />
            <Button label='Hủy' type='outline' onClick={onClickHuy} />
          </td>
        </tr>
      )}
    </>
  )
}
