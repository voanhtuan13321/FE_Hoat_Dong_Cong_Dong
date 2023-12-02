import React, { useEffect, useState } from 'react'
import Title from '../components/Title'
import InputSelect from '../components/InputSelect'
import Button from '../components/Button'
import Table from '../components/Table'
import ItemRowDanhSachLop from '../components/ItemRowDanhSachLop'
import ItemRowDanhSachLopAdd from '../components/ItemRowDanhSachLopAdd'

const optionsNamHoc = [
  { name: '2022-2023', value: 1 },
  { name: '2021-2022', value: 2 },
]

const optionsKhoa = [
  { name: 'K.Cơ Khí', value: 1 },
  { name: 'K.Công nghệ thông tin', value: 2 },
]

const dataTable = {
  header: [
    { className: 'w-5%', title: 'stt' },
    { className: 'w-20%', title: 'Khoa quản lý' },
    { className: 'w-10%', title: 'Lớp' },
    { className: 'w-10%', title: 'Giáo viên chủ nhiệm' },
    { className: 'w-10%', title: 'khóa' },
    { className: 'w-20%', title: '' },
  ],
  value: [
    {
      khoaQuanLy: 1,
      lop: '20C1A',
      giaoVienChuNhiem: 'Nguyễn Văn A',
      khoa: '2021-2022',
    },
    {
      khoaQuanLy: 2,
      lop: '20C1A',
      giaoVienChuNhiem: 'Nguyễn Văn B',
      khoa: '2021-2022',
    },
  ],
}

export default function AdminDanhSachLop() {
  const [listClass, setListClass] = useState([])
  const [selectedKhoa, setSelectedKhoa] = useState(optionsKhoa[0])
  const [selectedNamHoc, setSelectedNamHoc] = useState(optionsNamHoc[0])
  const [isAddNew, setIsAddNew] = useState(false)

  useEffect(() => {
    fetchListClass()
  }, [])

  const fetchListClass = () => {
    setListClass(dataTable.value)
  }

  const onClickThem = () => {
    setIsAddNew(true)
  }

  const onClickDeleteItem = index => {
    const cloneStates = [...listClass]
    cloneStates.splice(index, 1)
    setListClass(cloneStates)
  }

  const renderBodyTable = () => {
    let arrJsx = listClass.map((dt, index) => {
      return (
        <ItemRowDanhSachLop
          key={index}
          dt={dt}
          index={index}
          onClickDeleteItem={onClickDeleteItem}
        />
      )
    })
    isAddNew &&
      (arrJsx = [
        ...arrJsx,
        <ItemRowDanhSachLopAdd key={-1} setIsAddNew={setIsAddNew} />,
      ])
    return arrJsx
  }

  return (
    <div className='container mx-auto'>
      <Title title='danh sách lớp' />
      <div className='mt-3'>
        <div className='flex items-center justify-between gap-2 '>
          <div className='flex items-center gap-2'>
            <span className='font-bold text-primary text-main'>
              Thuộc khoa:
            </span>
            <div className='w-48'>
              <InputSelect
                options={optionsKhoa}
                value={selectedKhoa}
                onChange={setSelectedKhoa}
              />
            </div>
            <span className='font-bold text-primary text-main'>Khoá:</span>
            <div className='w-48'>
              <InputSelect
                options={optionsNamHoc}
                value={selectedNamHoc}
                onChange={setSelectedNamHoc}
              />
            </div>
          </div>
          {!isAddNew && (
            <div className=''>
              <Button label='thêm' type='add' onClick={onClickThem} />
            </div>
          )}
        </div>
      </div>
      <div className='my-2'>
        <Table header={dataTable.header}>{renderBodyTable()}</Table>
      </div>
    </div>
  )
}
