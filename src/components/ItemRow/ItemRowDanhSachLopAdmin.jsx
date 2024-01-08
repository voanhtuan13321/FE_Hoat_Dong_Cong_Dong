import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import Swal from 'sweetalert2'

import Button from '../Button'
import InputText from '../Input/InputText'
import InputSelect from '../Input/InputSelect'

import {
  REGEX,
  caculateIndex,
  callApiDeleteClass,
  callApiGetMajorsList,
  callApiGetTeachersList,
  callApiUpdateClass,
  generateAcademyYearOptions,
  handleError,
} from '../../utils'

export default function ItemRowDanhSachLop({
  dt,
  index,
  refresh,
  objectClasses,
}) {
  const academyYearOptions = generateAcademyYearOptions()

  const [isShowEdit, setShowEdit] = useState(false)
  const [teacherOptions, setTeacherOptions] = useState([])
  const [name, setName] = useState(dt.name)
  const [majorOptions, setMajorOptions] = useState([])
  const [selectedMajor, setSelectedMajor] = useState({})
  const [selectedTeacher, setSelectedTeacher] = useState({})
  const [selectedAcademyYear, setSelectedAcademyYear] = useState(
    academyYearOptions[0],
  )
  const navigate = useNavigate()

  useEffect(() => {
    fetchTeachers()
    fetchListMajor()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setName(dt.name)
    setSelectedMajor(majorOptions.find(item => item.name === dt.majorName))
    setSelectedAcademyYear(
      academyYearOptions.find(item => item.value === dt.academicYear),
    )
    setSelectedTeacher(
      teacherOptions.find(
        item => `${item.firstName} ${item.lastName}` === dt.headTeacherFullName,
      ),
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShowEdit])

  const fetchTeachers = async () => {
    try {
      const data = await callApiGetTeachersList()
      const result = data.map(item => ({
        ...item,
        name: item.firstName + ' ' + item.lastName,
        value: item.id,
      }))
      setTeacherOptions(result)
      setSelectedTeacher(result[0])
    } catch (error) {
      console.error(error)
      handleError(error, navigate)
    }
  }

  const fetchListMajor = async () => {
    try {
      const data = await callApiGetMajorsList()
      const result = data.map(item => ({
        ...item,
        name: item.name,
        value: item.id,
      }))
      // console.log(data)
      setMajorOptions(result)
      setSelectedMajor(result[0])
    } catch (error) {
      console.error(error)
      handleError(error, navigate)
    }
  }

  const handleSave = async () => {
    if (!REGEX.dontSpace.test(name)) {
      toast.error('Lớp không được chưa khoảng cách')
      return
    }

    try {
      const dataRequest = {
        ...dt,
        majorId: selectedMajor.id,
        name,
        headTeacherId: selectedTeacher.value,
        academicYear: selectedAcademyYear.value,
      }
      const data = await callApiUpdateClass(dataRequest)
      // console.log(data)
      toast.success('Cập nhật thành công')
      setShowEdit(false)
      refresh()
    } catch (error) {
      console.error(error)
      handleError(error, navigate)
    }
  }

  const onClickDeleteItem = async id => {
    const { isDenied } = await Swal.fire({
      title: 'Bạn có chắc muốn xoá không?',
      showConfirmButton: false,
      showDenyButton: true,
      denyButtonText: 'Xoá',
      showCancelButton: true,
    })

    if (isDenied) {
      try {
        const data = await callApiDeleteClass(id)
        // console.log(data)
        toast.success('Xoá thành công')
        refresh()
      } catch (error) {
        console.error(error)
        handleError(error, navigate)
      }
    }
  }

  return (
    <>
      {!isShowEdit ? (
        <tr className='text-center'>
          <td className='border border-primary text-main'>
            {caculateIndex(objectClasses, index)}
          </td>
          <td className='border border-primary text-main'>{dt.majorName}</td>
          <td className='border border-primary text-main'>{dt.name}</td>
          <td className='border border-primary text-main'>
            {dt.headTeacherFullName}
          </td>
          <td className='border border-primary text-main'>{dt.academicYear}</td>
          <td className='border border-primary text-main flex gap-2 justify-center'>
            <Button label='Sửa' type='edit' onClick={() => setShowEdit(true)} />
            <Button
              label='Xóa'
              type='delete'
              onClick={() => onClickDeleteItem(dt.id)}
            />
          </td>
        </tr>
      ) : (
        <tr className='text-center'>
          <td className='border border-primary text-main'>
            {caculateIndex(objectClasses, index)}
          </td>
          <td className='border border-primary text-main'>
            <InputSelect
              options={majorOptions}
              value={selectedMajor}
              onChange={setSelectedMajor}
            />
          </td>
          <td className='border border-primary text-main'>
            <InputText
              name='selectClass'
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </td>
          <td className='border border-primary text-main'>
            <InputSelect
              name='selectedTeacher'
              options={teacherOptions}
              value={selectedTeacher}
              onChange={setSelectedTeacher}
            />
          </td>
          <td className='border border-primary text-main'>
            <InputSelect
              options={academyYearOptions}
              value={selectedAcademyYear}
              onChange={setSelectedAcademyYear}
            />
          </td>
          <td className='border border-primary flex gap-2 justify-center'>
            <Button label='Lưu' type='add' onClick={handleSave} />
            <Button
              label='Hủy'
              type='outline'
              onClick={() => setShowEdit(false)}
            />
          </td>
        </tr>
      )}
    </>
  )
}
