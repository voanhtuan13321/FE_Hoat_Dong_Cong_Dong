import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import InputText from '../Input/InputText'
import InputSelect from '../Input/InputSelect'
import Button from '../Button'

import {
  callApiDeleteMajor,
  callApiGetTeachersList,
  callApiUpdateMajor,
  handleError,
} from '../../utils'

export default function ItemRowTableDanhSachKhoaAdmin({ stt, data, refresh }) {
  const [isShowEdit, setShowEdit] = useState(false)
  const [listTeachers, setListTeachers] = useState([{}])
  const [selectedTeacher, setSelectedTeacher] = useState({})
  const [major, setMajor] = useState({ ...data })
  const navigate = useNavigate()

  useEffect(() => {
    fetchListTeachers()
  }, [])

  useEffect(() => {
    setMajor(data)
  }, [data])

  const fetchListTeachers = async () => {
    try {
      const dataList = await callApiGetTeachersList()
      const result = dataList.map(item => ({
        ...item,
        name: item.firstName + ' ' + item.lastName,
        value: item.id,
      }))
      setListTeachers(result)
      const dataSelectSet = getListTeachers(data.majorHeadId, dataList)
      setSelectedTeacher({
        name: dataSelectSet.firstName + ' ' + dataSelectSet.lastName,
        value: dataSelectSet.id,
      })
    } catch (error) {
      console.error(error)
      handleError(error, navigate)
    }
  }

  const getListTeachers = (value, data) => {
    return !value ? data[0] : data.find(item => item.id === value)
  }

  const onChangeInput = event => {
    const { name, value } = event.target
    setMajor({ ...major, [name]: value })
  }

  const onClickSave = async () => {
    const dataEdit = {
      id: major.id,
      majorHeadId: selectedTeacher.id,
      name: major.name,
    }
    try {
      await callApiUpdateMajor(dataEdit)
      toast.success('Cập nhật thành công')
      setShowEdit(false)
      refresh()
    } catch (error) {
      console.error(error)
      handleError(error, navigate)
    }
  }

  const handleDeleteButtonClick = async id => {
    const { isConfirmed } = await Swal.fire({
      title: 'Bạn có chắc chắn muốn xóa?',
      text: 'Xóa khoa sẽ xóa toàn bộ lớp và sinh viên thuộc khoa',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Hủy',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Có, tôi chắc chắn!',
    })

    if (isConfirmed) {
      try {
        await callApiDeleteMajor(id)
        // console.log('Xóa')
        toast.success('Xóa thành công')
        refresh()
      } catch (error) {
        alert(error.message)
      }
    }
  }

  return (
    <>
      {isShowEdit ? (
        <tr className='text-main'>
          <td className='border border-primary p-1 text-center'>{stt + 1}</td>
          <td className='border border-primary p-1 text-center'>
            <InputText
              name='name'
              value={major.name}
              onChange={onChangeInput}
            />
          </td>
          <td className='border border-primary p-1 text-center'>
            <InputSelect
              name='giaoVien'
              value={selectedTeacher}
              onChange={setSelectedTeacher}
              options={listTeachers}
            />
          </td>
          <td className='border border-primary p-1 flex'>
            <div className='w-1/2 flex justify-center'>
              <Button label='lưu' type='' onClick={onClickSave} />
            </div>
            <div className='w-1/2 flex justify-center'>
              <Button
                label='hủy'
                type='outline'
                onClick={() => setShowEdit(!isShowEdit)}
              />
            </div>
          </td>
        </tr>
      ) : (
        <tr className='text-main'>
          <td className='border border-primary p-1 text-center'>{stt + 1}</td>
          <td className='border border-primary p-1 text-center'>{data.name}</td>
          <td className='border border-primary p-1 text-center'>
            {data.majorHeadFullName}
          </td>
          <td className='border border-primary p-1 flex'>
            <div className='w-1/2 flex justify-center'>
              <Button
                label='sửa'
                type='edit'
                onClick={() => setShowEdit(!isShowEdit)}
              />
            </div>
            <div className='w-1/2 flex justify-center'>
              <Button
                label='Xóa'
                type='delete'
                onClick={() => handleDeleteButtonClick(data.id)}
              />
            </div>
          </td>
        </tr>
      )}
    </>
  )
}
