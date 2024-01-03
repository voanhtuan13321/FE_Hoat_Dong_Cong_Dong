import React, { useEffect, useState } from 'react'
import Button from './Button'
import InputSelect from './InputSelect'
import InputText from './InputText'
import { handleError, requestHandler } from '../utils'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setLoading } from '../redux/storeSlice'
import toast from 'react-hot-toast'

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
  const dispatch = useDispatch()

  useEffect(() => {
    fetchListGiaoVien()
  }, [])

  const fetchListGiaoVien = async () => {
    try {
      dispatch(setLoading(true))
      const url = `api/User/GetTeachersList`
      const response = await requestHandler.get(url)
      const data = await response.data.map(item => ({
        ...item,
        name: item.firstName + ' ' + item.lastName,
        value: item.id,
      }))
      // console.log(data)
      setOptionTeachers(data)
      setSelectTeacher(data[0])
    } catch (error) {
      console.error(error)
      handleError(error, navigate)
    } finally {
      dispatch(setLoading(false))
    }
  }

  const handleSave = async () => {
    try {
      dispatch(setLoading(true))
      const savedData = {
        majorId,
        headTeacherId: selectTeacher.value,
        name,
        academicYear,
      }
      const url = `api/Class/CreateClass`
      const response = await requestHandler.post(url, savedData)
      const data = await response.data
      console.log(data)
      toast.success('Thêm mới thành công')
      setIsAddNew(false)
      refresh()
    } catch (error) {
      console.error(error)
      handleError(error, navigate)
    } finally {
      dispatch(setLoading(false))
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
