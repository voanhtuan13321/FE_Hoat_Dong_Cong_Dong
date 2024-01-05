import React from 'react'
import Swal from 'sweetalert2'
import Button from './Button'
import InputCheckbox from './InputCheckbox'

export default function ItemRowTableDanhSachGiaoVienAdmin({ stt, data }) {
  const onClickDoiMatKhau = () => {
    Swal.fire({
      title: 'Nhập mật khẩu mới',
      input: 'text',
      showCancelButton: true,
      cancelButtonText: 'huỷ',
      confirmButtonText: 'Xác nhận',
      showLoaderOnConfirm: true,
      preConfirm: async valuePassword => {
        if (!valuePassword) {
          return Swal.showValidationMessage('bạn chưa nhập mật khẩu')
        }
      },
    }).then(result => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: `Thay đổi mật khẩu thành công!`,
          showConfirmButton: false,
          timer: 1500,
        })
      }
    })
  }

  return (
    <tr>
      <td className='border border-primary p-1 text-center'>{stt}</td>
      <td className='border border-primary p-1 text-center'>
        {data.teacherId}
      </td>
      <td className='border border-primary p-1'>{data.firstName } {data.lastName}</td>
      <td className='border border-primary p-1 text-center'>
        <Button type='edit' label='sửa' onClick={onClickDoiMatKhau} />
      </td>
      <td className='border border-primary p-1 text-center'>
        <InputCheckbox value={data.disabled} onChange={() => {}} />
      </td>
    </tr>
  )
}
