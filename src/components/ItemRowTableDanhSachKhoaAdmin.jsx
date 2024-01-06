import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import Button from './Button'
import InputSelect from './InputSelect'
import InputText from './InputText'
import {
  callApiDeleteMajor,
  callApiGetTeachersList,
  callApiUpdateMajor,
  handleError,
  requestHandler,
} from '../utils'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export default function ItemRowTableDanhSachKhoaAdmin({
  stt,
  data,
  refresh,
  objectMajors,
}) {
  const [isShowEdit, setShowEdit] = useState(false)
  const [listGiaoVien, setListGiaoVien] = useState([{}])
  const [selectedGiaoVien, setSelectedGiaoVien] = useState({})
  const [dataKhoa, setDataKhoa] = useState({ ...data })
  const navigate = useNavigate()
  const onClickEdit = () => {
    setShowEdit(!isShowEdit)
    console.log(dataKhoa)
  }

  useEffect(() => {
    fetchListDanhSachGiaoVien()
  }, [])

  const fetchListDanhSachGiaoVien = async () => {
    try {
      const data = await callApiGetTeachersList()
      const result = data.map(item => ({
        ...item,
        name: item.firstName + ' ' + item.lastName,
        value: item.id,
      }))
      setListGiaoVien(result)
      const dataSelectSet = getDanhSachGiaoVien(data.majorHeadId, result)
      console.log('dataSelect', dataSelectSet)
      setSelectedGiaoVien(dataSelectSet)
    } catch (error) {
      console.error(error)
      handleError(error, navigate)
    }
  }
  const onSelectChange = (name, selectedOption) => {
    setDataKhoa({ ...dataKhoa, [name]: selectedOption })
    setSelectedGiaoVien(selectedOption)
  }

  const getDanhSachGiaoVien = (value, tenData) => {
    return value
      ? tenData[0]
      : tenData.find(item => item.value === value) || tenData[0]
  }
  const onChangeInput = event => {
    const { name, value } = event.target
    setDataKhoa({
      ...dataKhoa,
      [name]: value,
    })
  }
  const onClickLuu = async () => {
    const dataEdit = {}
    Object.assign(dataEdit, {
      id: dataKhoa.id,
      majorHeadId: dataKhoa.giaoVien.value,
      name: dataKhoa.name,
    })
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
    await Swal.fire({
      title: 'Bạn có chắc chắn muốn xóa?',
      text: 'Xóa khoa sẽ xóa toàn bộ lớp và sinh viên thuộc khoa',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Hủy',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Có, tôi chắc chắn!',
    }).then(async result => {
      if (result.isConfirmed) {
        try {
          await callApiDeleteMajor(id)
          console.log('Xóa')
          toast.success('Xóa thành công')
          refresh()
        } catch (error) {
          alert(error.message)
        }
      }
    })
  }

  const renderContent = (value, name) =>
    isShowEdit ? (
      name === 'name' ? (
        <InputText name={name} value={value} onChange={onChangeInput} />
      ) : (
        <InputSelect
          name={name}
          value={selectedGiaoVien}
          onChange={selected => onSelectChange(name, selected)}
          options={listGiaoVien}
        />
      )
    ) : (
      value
    )

  return (
    <tr className='text-main'>
      <td className='border border-primary p-1 text-center'>{stt + 1}</td>
      <td className='border border-primary p-1 text-center'>
        {renderContent(dataKhoa.name, 'name')}
      </td>
      <td className='border border-primary p-1 text-center'>
        {renderContent(dataKhoa.majorHeadFullName, 'giaoVien')}
      </td>
      <td className='border border-primary p-1 flex'>
        <div className='w-1/2 flex justify-center'>
          <Button
            label={isShowEdit ? 'lưu' : 'sửa'}
            type={isShowEdit ? '' : 'edit'}
            onClick={isShowEdit ? onClickLuu : onClickEdit}
          />
        </div>
        <div className='w-1/2 flex justify-center'>
          <Button
            label={isShowEdit ? 'hủy' : 'Xóa'}
            type={isShowEdit ? 'outline' : 'delete'}
            onClick={
              isShowEdit
                ? onClickEdit
                : () => handleDeleteButtonClick(dataKhoa.id)
            }
          />
        </div>
      </td>
    </tr>
  )
}
