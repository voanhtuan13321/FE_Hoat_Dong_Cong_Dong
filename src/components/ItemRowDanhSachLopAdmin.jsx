import React, { useEffect, useState } from 'react'
import Button from './Button'
import InputText from './InputText'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { generateNamHocOptions, handleError, requestHandler } from '../utils'
import { setLoading } from '../redux/storeSlice'
import InputSelect from './InputSelect'
import toast from 'react-hot-toast'
import Swal from 'sweetalert2'

export default function ItemRowDanhSachLop({ dt, index, major, refresh }) {
  const optionsNamHoc = generateNamHocOptions(5)

  const [isShowEdit, setShowEdit] = useState(false)
  const [optionTeachers, setOptionTeachers] = useState([])
  const [name, setName] = useState(dt.name)
  const [selectTeacher, setSelectTeacher] = useState({})
  const [selectedNamHoc, setSelectedNamHoc] = useState(optionsNamHoc[0])
  const [optionsKhoa, setOptionsKhoa] = useState([])
  const [selectedKhoa, setSelectedKhoa] = useState({})

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    fetchDanhSachGiaoVien()
    fetchListKhoa()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setName(dt.name)
    setSelectedNamHoc(
      optionsNamHoc.find(item => item.value === dt.academicYear),
    )
    setSelectedKhoa(optionsKhoa.find(item => item.name === major.name))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShowEdit])

  const fetchDanhSachGiaoVien = async () => {
    try {
      dispatch(setLoading(true))
      const url = `api/User/GetTeachersList`
      const response = await requestHandler.get(url)
      const data = await response.data.map(item => ({
        ...item,
        name: item.firstName + ' ' + item.lastName,
        value: item.id,
      }))
      setOptionTeachers(data)
      setSelectTeacher(data[0])
    } catch (error) {
      console.error(error)
      handleError(error, navigate)
    } finally {
      dispatch(setLoading(false))
    }
  }

  const fetchListKhoa = async () => {
    try {
      dispatch(setLoading(true))
      const url = `api/Major/GetMajorsList`
      const response = await requestHandler.get(url)
      const data = await response.data.map(item => ({
        ...item,
        name: item.name,
        value: item.id,
      }))
      // console.log(data)
      setOptionsKhoa(data)
      setSelectedKhoa(data[0])
    } catch (error) {
      console.error(error)
      handleError(error, navigate)
    } finally {
      dispatch(setLoading(false))
    }
  }

  const handleSave = async () => {
    if (!/^[a-zA-Z0-9_]+$/.test(name)) {
      toast.error('Lớp không được chưa khoảng cách')
      return
    }

    try {
      dispatch(setLoading(true))
      const dataRequest = {
        ...dt,
        majorId: selectedKhoa.id,
        name,
        headTeacherId: selectTeacher.value,
        academicYear: selectedNamHoc.value,
      }
      const url = `api/Class/UpdateClass`
      const response = await requestHandler.put(url, dataRequest)
      const data = await response.data
      // console.log(data)
      toast.success('Cập nhật thành công')
      refresh()
    } catch (error) {
      console.error(error)
      handleError(error, navigate)
    } finally {
      dispatch(setLoading(false))
    }
  }

  const handleEdit = () => setShowEdit(true)

  const onClickHuy = () => {
    setShowEdit(false)
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
        dispatch(setLoading(true))
        const url = `api/Class/DeleteClass`
        const config = { params: { classId: id } }
        const response = await requestHandler.delete(url, config)
        const data = await response.data
        // console.log(data)
        toast.success('Xoá thành công')
        refresh()
      } catch (error) {
        console.error(error)
        handleError(error, navigate)
      } finally {
        dispatch(setLoading(false))
      }
    }
  }

  return (
    <>
      {!isShowEdit ? (
        <tr className='text-center'>
          <td className='border border-primary text-main'>{index + 1}</td>
          <td className='border border-primary text-main'>{major.name}</td>
          <td className='border border-primary text-main'>{dt.name}</td>
          <td className='border border-primary text-main'>
            {dt.headTeacherFullName}
          </td>
          <td className='border border-primary text-main'>{dt.academicYear}</td>
          <td className='border border-primary text-main flex gap-2 justify-center'>
            <Button label='Sửa' type='edit' onClick={handleEdit} />
            <Button
              label='Xóa'
              type='delete'
              onClick={() => onClickDeleteItem(dt.id)}
            />
          </td>
        </tr>
      ) : (
        <tr className='text-center' key={index}>
          <td className='border border-primary text-main'>{index + 1}</td>
          <td className='border border-primary text-main'>
            <InputSelect
              options={optionsKhoa}
              value={selectedKhoa}
              onChange={setSelectedKhoa}
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
              name='selectTeacher'
              options={optionTeachers}
              value={selectTeacher}
              onChange={setSelectTeacher}
            />
          </td>
          <td className='border border-primary text-main'>
            <InputSelect
              options={optionsNamHoc}
              value={selectedNamHoc}
              onChange={setSelectedNamHoc}
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
