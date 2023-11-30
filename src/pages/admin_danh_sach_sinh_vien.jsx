import React, { useEffect, useState } from 'react'
import Table from '../components/Table'
import Title from '../components/Title'
import ItemRowDanhSachSinhVienAdmin from '../components/ItemRowDanhSachSinhVienAdmin'
import ItemAddRowDanhSachSinhVienAdmin from '../components/ItemAddRowDanhSachSinhVienAdmin'
import Button from '../components/Button'

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
  const [data, setData] = useState([])
  const [isShowAddNew, setShowAddNew] = useState(false)

  useEffect(() => {
    setData(dataTable.value)
  }, [])

  const onClickThem = () => {
    setShowAddNew(true)
  }

  const renderBodyTable = () => {
    let arrJsx = data?.map((dt, index) => {
      return <ItemRowDanhSachSinhVienAdmin data={dt} index={index} />
    })

    isShowAddNew &&
      (arrJsx = [
        ...arrJsx,
        <ItemAddRowDanhSachSinhVienAdmin
          key={-1}
          setShowAddNew={setShowAddNew}
        />,
      ])

    return arrJsx
  }

  return (
    <>
      <div className='container p-2 justify-center m-auto'>
        <div>
          <Title title='danh sách sinh viên' />
        </div>
        <div className='py-2 text-end'>
          {!isShowAddNew && (
            <Button type='add' label='thêm' onClick={onClickThem} />
          )}
        </div>
        <div className='my-2'>
          <Table header={dataTable.header}>{renderBodyTable()}</Table>
        </div>
      </div>
    </>
  )
}
