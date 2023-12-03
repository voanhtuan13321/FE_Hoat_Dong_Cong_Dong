import React, { useState,useEffect } from 'react'
import Title from '../components/Title'
import InputSelect from '../components/InputSelect'
import Button from '../components/Button'
import ItemRowTableDanhSachLop from '../components/ItemRowTableDanhSachLop'
import Table from '../components/Table'


const apiClassList = [
  { name: 'Chọn Lớp', value: 0 },
  { name: '18CA1', value: 1 },
  { name: '18CA2', value: 2 },
  { name: '18CA3', value: 3 },
]

const apiNamHocList = [
  { name: 'Chọn năm', value: 0 },
  { name: '2021', value: 1 },
  { name: '2022', value: 2 },
  { name: '2023', value: 3 },
]

const dataTable = {
  header: [
    { className: 'w-5%', title: 'stt' },
    { className: 'w-10%', title: 'Số thẻ sinh viên' },
    { className: 'w-10%', title: 'Tên sinh viên' },
    { className: 'w-10%', title: 'Số điện thoại' },
    { className: 'w-10%', title: 'Email' },
    { className: 'w-10%', title: 'Facebook' },
    { className: 'w-20%', title: 'Địa chỉ' },
    { className: 'w-5%', title: 'Chọn lớp trưởng' },
    { className: 'w-20%', title: 'Xem chi tiết' },
  ],
  value: [
    {
      soTheSV: '1203908',
      hoTen: 'Nguyễn Văn Né',
      sdt: '0905123123',
      email: 'NeVan@Gmail.com',
      fb: 'http://www.fb.com',
      diaChi: 'Số 34, Đường Nguyễn Thị Cận, Phường Hoà Minh, Quân Liên chiểu, TP Đà Nẵng',
      chonLopTruong: false,
    },
    {
      soTheSV: '1231231',
      hoTen: 'Nguyễn Văn Né',
      sdt: '0905123123',
      email: 'NeVan@Gmail.com',
      fb: 'http://www.fb.com',
      diaChi: 'Số 34, Đường Nguyễn Thị Cận, Phường Hoà Minh, Quân Liên chiểu, TP Đà Nẵng',
      chonLopTruong: true,
    },
  ],
}
export default function DanhSachLop() {
  const [listHocSinh,setListHocSinh] = useState([])
  const [danhSachLop,setDanhSachLop] = useState([])
  const [danhSachNam,setDanhSachNam] = useState([])
  const [selectClass,setSelectClass] = useState(apiClassList[0])
  const [selectYear,setSelectYear] = useState(apiNamHocList[0])
  useEffect(()=>{
    fetchListHocSinh()
    fetchListLop()
    fetchListNamHoc()
  },[])
  const fetchListHocSinh = () =>{
    setListHocSinh(dataTable.value)
  }
  const fetchListLop = () =>{
    setDanhSachLop(apiClassList)
  }
  const fetchListNamHoc = () =>{
    setDanhSachNam(apiNamHocList)
  }
  const handleXacNhan = () =>{
    console.log(listHocSinh);
  }
  const renderBodyTable = () => {
   let tableRow = listHocSinh.map((dt, index) => {
      return (
        <ItemRowTableDanhSachLop
          key={index}
          dt={dt}
          index={index}
        />
      )
    })
  return tableRow

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
              options={danhSachLop}
              value={selectClass}
              onChange={setSelectClass}
            />
          </div>
          <span className='font-bold text-primary text-main'>Khoá:</span>
          <div className='w-48'>
            <InputSelect
              options={danhSachNam}
              value={selectYear}
              onChange={setSelectYear}
            />
          </div>
        </div>
          <div className=''>
            <Button label='Xác nhận' type='primary' onClick={handleXacNhan} />
          </div>
      
      </div>
    </div>
    <div className='my-2'>
      <Table header={dataTable.header}>{renderBodyTable()}</Table>
    </div>
  </div>
  )
}
