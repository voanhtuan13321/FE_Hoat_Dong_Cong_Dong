import React, { useState } from 'react'
import Table from '../components/Table'

const dataTable = {
  header: [
    { className: 'w-1/12', title: 'stt' },
    { className: 'w-3/12', title: 'mã giáo viên' },
    { className: 'w-3/12', title: 'họ và tên' },
    { className: 'w-2/12', title: 'đổi mật khẩu' },
    { className: 'w-2/12', title: 'khoá tài khoản' },
  ],
  value: [
    { stt: 1, email: 'test@example.com' },
    { stt: 1, email: 'test@example.comqwerqwe' },
  ],
}

export default function AdminDanhSachGiaoVien() {
  return (
    <div className='container mx-auto'>
      <div>Title</div>
      <div>
        <div>button</div>
        <div>
          <Table data={dataTable} />
        </div>
      </div>
    </div>
  )
}
