import React, { useState } from 'react'
import Table from '../components/Table'
import Title from '../components/Title'
import Button from '../components/Button'
import InputCheckbox from '../components/InputCheckbox'
import Swal from 'sweetalert2'

const dataTable = {
  header: [
    { className: 'w-5%', title: 'stt' },
    { className: 'w-15%', title: 'Mã sinh viên' },
    { className: '', title: 'Họ tên' },
    { className: 'w-15%', title: 'Đổi mật khẩu' },
    { className: 'w-15%', title: 'Khoá tài khoản' },
  ],
  value: [
    {
      stt: 1,
      svid: 'SV01',
      name: 'Trần Văn Né',
      passwork: '123456',
      isDeleted: true,
    },
    {
      stt: 1,
      svid: 'SV01',
      name: 'Trần Văn Né',
      passwork: '123456',
      isDeleted: true,
    },
    {
      stt: 1,
      svid: 'SV01',
      name: 'Trần Văn Né',
      passwork: '123456',
      isDeleted: false,
    },
    {
      stt: 1,
      svid: 'SV01',
      name: 'Trần Văn Né',
      passwork: '123456',
      isDeleted: true,
    },
    {
      stt: 1,
      svid: 'SV01',
      name: 'Trần Văn Né',
      passwork: '123456',
      isDeleted: false,
    },
    {
      stt: 1,
      svid: 'SV01',
      name: 'Trần Văn Né',
      passwork: '123456',
      isDeleted: true,
    },
  ],
}

export default function AdminDanhSachSinhVien() {
  const [data, setData] = useState(dataTable.value)
  const changeCheckbox = index => {
    const newData = [...data]
    newData[index] = {
      ...newData[index],
      isDeleted: !newData[index].isDeleted,
    }
    setData(newData)
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

  const renderBodyTable = () => {
    return data?.map((dt, index) => {
      return (
        <tr key={index}>
          <td className='border border-primary p-1 text-center'>{dt.stt}</td>
          <td className='border border-primary p-1 text-center'>{dt.svid}</td>
          <td className='border border-primary px-3'>{dt.name}</td>
          <td className='border border-primary p-1 text-center'>
            <Button
              type={'edit'}
              label={'sửa'}
              onClick={e => handleButtonEdit()}
            ></Button>
          </td>
          <td className='border border-primary p-1'>
            <InputCheckbox
              label={''}
              name={''}
              value={dt.isDeleted}
              onChange={() => changeCheckbox(index)}
            ></InputCheckbox>
          </td>
        </tr>
      )
    })
  }

  return (
    <>
      <div className='container p-2 justify-center m-auto'>
        <div>
          <Title title={'danh sách sinh viên'}></Title>
        </div>
        <div className='my-2'>
          <Table header={dataTable.header}>{renderBodyTable()}</Table>
        </div>
      </div>
    </>
  )
}
