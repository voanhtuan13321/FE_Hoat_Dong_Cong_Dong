import React from 'react'
import Table from '../components/Table'

export default function AdminDanhSachSinhVien() {
  const dataTable = {
    header: [
      { className: 'w-1/12', title: 'stt' },
      { className: 'w-2/12', title: 'Mã sinh viên' },
      { className: 'w-5/12', title: 'Họ tên' },
      { className: 'w-2/12', title: 'Đổi mật khẩu' },
      { className: 'w-2/12', title: 'Khoá tài khoản' },
    ],
    value: [
      { stt: 1, svid: 'SV01', name: 'Trần Văn Né' },
      { stt: 1, svid: 'SV01', name: 'Trần Văn Né' },
      { stt: 1, svid: 'SV01', name: 'Trần Văn Né' },
      { stt: 1, svid: 'SV01', name: 'Trần Văn Né' },
      { stt: 1, svid: 'SV01', name: 'Trần Văn Né' },
      { stt: 1, svid: 'SV01', name: 'Trần Văn Né' },
    ],
  }
  const renderBodyTable = () => {
    return dataTable.value.map((dt, index) => {
      return (
        <tr key={index}>
          <td className='border border-primary p-1 text-center'>{dt.stt}</td>
          <td className='border border-primary p-1 text-center'>{dt.svid}</td>
          <td className='border border-primary p-1 text-center'>{dt.name}</td>
          <td className='border border-primary p-1 text-center'>button</td>
          <td className='border border-primary p-1'>checkbox</td>
        </tr>
      )
    })
  }

  return (
    <>
      <div className='container p-3'>
        <div className='bg-second-color'>danh sách sinh vien</div>
        <div className='my-2'>
          <Table data={dataTable}>{renderBodyTable}</Table>
        </div>
      </div>
    </>
  )
}
