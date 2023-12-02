import React, { useEffect, useState } from 'react'
import Button from './Button'
import InputSelect from './InputSelect'

const apiClassList = [
  { name: '18CA1', value: 1 },
  { name: '18CA2', value: 2 },
  { name: '18CA3', value: 3 },
]

const apiTeacherList = [
  { name: 'Nguyễn Văn A', value: 1 },
  { name: 'Nguyễn Văn B', value: 2 },
  { name: 'Nguyễn Văn C', value: 3 },
]

const apiKhoaList = [
  { name: 'K.Cơ Khí', value: 1 },
  { name: 'K.Vật lý', value: 2 },
  { name: 'K.CNTT', value: 3 },
]

const apiNamHocList = [
  { name: '2021', value: 1 },
  { name: '2022', value: 2 },
  { name: '2023', value: 3 },
]

export default function ItemRowDanhSachLop({ dt, index, onClickDeleteItem }) {
  const [isShowEdit, setShowEdit] = useState(false)
  const [classes, setClasses] = useState([])
  const [teachers, setTeachers] = useState([])
  const [faculties, setFaculties] = useState([])
  const [years, setYears] = useState([])
  const [selectFaculty, setSelectFaculty] = useState(null)
  const [selectClass, setSelectClass] = useState(null)
  const [selectTeacher, setSelectTeacher] = useState(null)
  const [selectYear, setSelectYear] = useState(null)

  useEffect(() => {
    fetchDanhSachLop()
    fetchDanhSachGiaoVien()
    fetchDanhSachKhoa()
    fetchDanhSachNamHoc()
  }, [])

  const fetchDanhSachLop = () => {
    setClasses(apiClassList)
    setSelectClass(apiClassList[0])
  }

  const fetchDanhSachGiaoVien = () => {
    setTeachers(apiTeacherList)
    setSelectTeacher(apiTeacherList[0])
  }

  const fetchDanhSachKhoa = () => {
    setFaculties(apiKhoaList)
    setSelectFaculty(apiKhoaList[0])
  }

  const fetchDanhSachNamHoc = () => {
    setYears(apiNamHocList)
    setSelectYear(apiNamHocList[0])
  }

  const getFacultyName = value => {
    return faculties.filter(faculty => faculty.value === value)[0]?.name
  }

  const handleSave = () => {}

  const handleEdit = () => {
    setShowEdit(true)
  }

  const onClickHuy = () => {
    setShowEdit(false)
  }

  return (
    <>
      {!isShowEdit ? (
        <tr className='text-center'>
          <td className='border border-primary text-main'>{index + 1}</td>
          <td className='border border-primary text-main'>
            {getFacultyName(dt.khoaQuanLy)}
          </td>
          <td className='border border-primary text-main'>{dt.lop}</td>
          <td className='border border-primary text-main'>
            {dt.giaoVienChuNhiem}
          </td>
          <td className='border border-primary text-main'>{dt.khoa}</td>
          <td className='border border-primary text-main flex gap-2 justify-center'>
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
              options={faculties}
              value={selectFaculty}
              onChange={setSelectFaculty}
            />
          </td>
          <td className='border border-primary'>
            <InputSelect
              name='selectClass'
              options={classes}
              value={selectClass}
              onChange={setSelectClass}
            />
          </td>
          <td className='border border-primary'>
            <InputSelect
              name='selectTeacher'
              options={teachers}
              value={selectTeacher}
              onChange={setSelectTeacher}
            />
          </td>
          <td className='border border-primary'>
            <InputSelect
              name='selectYear'
              options={years}
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
