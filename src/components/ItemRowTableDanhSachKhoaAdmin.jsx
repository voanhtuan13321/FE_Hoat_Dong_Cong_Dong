import React, { useState } from 'react'
import Swal from 'sweetalert2'
import Button from './Button'
import InputText from './InputText'

export default function ItemRowTableDanhSachKhoaAdmin({ stt, data }) {
  const [isShowEdit, setShowEdit] = useState(false)
  const [dataKhoa, setDataKhoa] = useState({
    khoa: data.khoa,
    ten: data.ten,
  })

  const onClickEdit = () => {
    setShowEdit(!isShowEdit)
  }

  const onChangeInput = event => {
    const { name, value } = event.target
    setDataKhoa({
      ...dataKhoa,
      [name]: value,
    })
  }

  const onClickLuu = () => {
    // console.log(dataKhoa)
  }

  const handleDeleteButtonClick = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success',
        })
      }
    })
  }

  const renderContent = (value, name) =>
    isShowEdit ? (
      <InputText name={name} value={value} onChange={onChangeInput} />
    ) : (
      value
    )

  return (
    <tr className='text-main'>
      <td className='border border-primary p-1 text-center'>{stt + 1}</td>
      <td className='border border-primary p-1 text-center'>
        {renderContent(dataKhoa.khoa, 'khoa')}
      </td>
      <td className='border border-primary p-1 text-center'>
        {renderContent(dataKhoa.ten, 'ten')}
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
            onClick={isShowEdit ? onClickEdit : handleDeleteButtonClick}
          />
        </div>
      </td>
    </tr>
  )
}
