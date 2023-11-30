import React, { useState } from 'react'
import Button from './Button'
import InputCheckbox from './InputCheckbox'
import Swal from 'sweetalert2'

export default function ItemRowDanhSachSinhVienAdmin({ data, index }) {
  const [dataSV, setDataSV] = useState(data)

  const changeCheckbox = () => {
    setDataSV({
      ...dataSV,
      isDeleted: !dataSV.isDeleted,
    })
    console.log(dataSV)
  }

  const handleButtonEdit = () => {
    Swal.fire({
      title: 'Nhập mật khẩu mới',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      cancelButtonText: 'huỷ',
      confirmButtonText: 'Xác nhận',
      showLoaderOnConfirm: true,
      preConfirm: async valuePassword => {
        // check validate
        if (!valuePassword) {
          return Swal.showValidationMessage('bạn chưa nhập mật khẩu')
        }
      },
    }).then(result => {
      if (result.isConfirmed) {
        // ${result.value}
        //call api
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
    <tr key={index}>
      <td className='border border-primary p-1 text-center'>{dataSV.stt}</td>
      <td className='border border-primary p-1 text-center'>{dataSV.svid}</td>
      <td className='border border-primary px-3'>{dataSV.name}</td>
      <td className='border border-primary p-1 text-center'>
        <Button type={'edit'} label={'sửa'} onClick={e => handleButtonEdit()} />
      </td>
      <td className='border border-primary p-1'>
        <InputCheckbox
          label={''}
          name={''}
          value={dataSV.isDeleted}
          onChange={() => changeCheckbox()}
        />
      </td>
    </tr>
  )
}
