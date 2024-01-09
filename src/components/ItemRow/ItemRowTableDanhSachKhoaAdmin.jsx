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
  const [listGiaoVien, setListGiaoVien] = useState([{}])
  const [selectedGiaoVien, setSelectedGiaoVien] = useState({})
  const [dataKhoa, setDataKhoa] = useState({ ...data })
  const navigate = useNavigate()

  const onClickEdit = () => {
    setShowEdit(!isShowEdit)
  }

  useEffect(() => {
    fetchListDanhSachGiaoVien()
  }, [])

  useEffect(() => {
    setDataKhoa(data)
  }, [data])

  const fetchListDanhSachGiaoVien = async () => {
    try {
      const dataList = await callApiGetTeachersList()
      const result = dataList.map(item => ({
        ...item,
        name: item.firstName + ' ' + item.lastName,
        value: item.id,
      }))
      setListGiaoVien(result)
      const dataSelectSet = getDanhSachGiaoVien(data.majorHeadId, dataList)
      setSelectedGiaoVien({
        name: dataSelectSet.firstName + ' ' + dataSelectSet.lastName,
        value: dataSelectSet.id,
      })
    } catch (error) {
      console.error(error)
      handleError(error, navigate)
    }
  }

  const getDanhSachGiaoVien = (value, tenData) => {
    return !value ? tenData[0] : tenData.find(item => item.id === value)
  }

  const onChangeInput = event => {
    const { name, value } = event.target
    setDataKhoa({
      ...dataKhoa,
      [name]: value,
    })
  }

  const onClickLuu = async () => {
    const dataEdit = {
      id: dataKhoa.id,
      majorHeadId: selectedGiaoVien.id,
      name: dataKhoa.name,
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

  return (
    <>
      {isShowEdit ? (
        <tr className='text-main'>
          <td className='border border-primary p-1 text-center'>{stt + 1}</td>
          <td className='border border-primary p-1 text-center'>
            <InputText
              name='name'
              value={dataKhoa.name}
              onChange={onChangeInput}
            />
          </td>
          <td className='border border-primary p-1 text-center'>
            <InputSelect
              name='giaoVien'
              value={selectedGiaoVien}
              onChange={setSelectedGiaoVien}
              options={listGiaoVien}
            />
          </td>
          <td className='border border-primary p-1 flex'>
            <div className='w-1/2 flex justify-center'>
              <Button label='lưu' type='' onClick={onClickLuu} />
            </div>
            <div className='w-1/2 flex justify-center'>
              <Button label='hủy' type='outline' onClick={onClickEdit} />
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
              <Button label='sửa' type='edit' onClick={onClickEdit} />
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
