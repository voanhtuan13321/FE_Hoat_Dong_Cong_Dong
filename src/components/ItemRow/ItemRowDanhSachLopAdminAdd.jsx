import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

import Button from '../Button'
import InputSelect from '../Input/InputSelect'
import InputText from '../Input/InputText'

import {
  callApiCreateClass,
  callApiGetTeachersList,
  handleError,
} from '../../utils'

export default function ItemRowDanhSachLopAdd({
  setIsAddNew,
  majorId,
  academicYear,
  refresh,
}) {
  const [optionTeachers, setOptionTeachers] = useState([])
  const [selectTeacher, setSelectTeacher] = useState({})
  const [name, setName] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    fetchListTeacher()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchListTeacher = async () => {
    try {
      const data = await callApiGetTeachersList()
      const result = data.map(item => ({
        ...item,
        name: item.firstName + ' ' + item.lastName,
        value: item.id,
      }))
      // console.log(data)
      setOptionTeachers(result)
      setSelectTeacher(result[0])
    } catch (error) {
      console.error(error)
      handleError(error, navigate)
    }
  }

  const handleSave = async () => {
    try {
      const savedData = {
        majorId,
        headTeacherId: selectTeacher.value,
        name,
        academicYear,
      }
      const data = await callApiCreateClass(savedData)
      // console.log(data)
      toast.success('Thêm mới thành công')
      setIsAddNew(false)
      refresh()
    } catch (error) {
      console.error(error)
      handleError(error, navigate)
    }
  }

  return (
    <tr className='text-center'>
      <td className='border border-primary'></td>
      <td className='border border-primary'></td>
      <td className='border border-primary'>
        <InputText value={name} onChange={e => setName(e.target.value)} />
      </td>
      <td className='border border-primary'>
        <InputSelect
          name='selectTeacher'
          options={optionTeachers}
          value={selectTeacher}
          onChange={setSelectTeacher}
        />
      </td>
      <td className='border border-primary'></td>
      <td className='border border-primary flex gap-2 justify-center'>
        <Button label='Lưu' type='add' onClick={handleSave} />
        <Button label='Hủy' type='outline' onClick={() => setIsAddNew(false)} />
      </td>
    </tr>
  )
}
