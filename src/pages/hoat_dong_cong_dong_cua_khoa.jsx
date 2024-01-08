import React, { useEffect, useState } from 'react'
import Title from '../components/Title'
import Table from '../components/Table'
import InputSelect from '../components/Input/InputSelect'
import Button from '../components/Button'
import { useSelector } from 'react-redux'
import { ROLES, checkRoles } from '../utils'

const dataTable = {
  header: [
    { className: 'w-5%', title: 'stt' },
    { className: 'w-20%', title: 'Mã Sinh Viên' },
    { className: '', title: 'Họ và tên' },
    { className: 'w-20%', title: 'Lớp' },
    { className: 'w-20%', title: 'Điểm' },
  ],
  value: [
    { maSV: 'SV001', hoVaTen: 'Dao Minh Tri', lop: '18CNTT', diem: '40' },
    { maSV: 'SV001', hoVaTen: 'Dao Minh Tri', lop: '18CNTT', diem: '40' },
    { maSV: 'SV001', hoVaTen: 'Dao Minh Tri', lop: '18CNTT', diem: '40' },
    { maSV: 'SV001', hoVaTen: 'Dao Minh Tri', lop: '18CNTT', diem: '40' },
    { maSV: 'SV001', hoVaTen: 'Dao Minh Tri', lop: '18CNTT', diem: '40' },
    { maSV: 'SV001', hoVaTen: 'Dao Minh Tri', lop: '18CNTT', diem: '40' },
    { maSV: 'SV001', hoVaTen: 'Dao Minh Tri', lop: '18CNTT', diem: '40' },
  ],
}
const options = [
  { name: 'Học kỳ 1 năm 2023', value: 2023 },
  { name: 'Học kỳ 1 năm 2022', value: 2022 },
  { name: 'Học kỳ 1 năm 2021', value: 2021 },
]

export default function HoatDongCongDongCuaKhoa() {
  const [data, setData] = useState([])
  const role = useSelector(state => state.role)

  const [selected, setSelected] = useState(options[0])

  useEffect(() => {
    fetchListHDCD()
  }, [])

  const fetchListHDCD = () => {
    setData(dataTable.value)
  }

  const shouldShowButton = () => {
    const currentYear = new Date().getFullYear()
    return currentYear === selected.value
  }

  const renderBodyTable = () => {
    return data?.map((dt, index) => {
      return (
        <tr key={index}>
          <td className='border border-primary p-1 text-center'>{index + 1}</td>
          <td className='border border-primary p-1 text-center'>{dt.maSV}</td>
          <td className='border border-primary p-1 '>{dt.hoVaTen}</td>
          <td className='border border-primary p-1 text-center'>{dt.lop}</td>
          <td className='border border-primary p-1 text-center'>{dt.diem}</td>
        </tr>
      )
    })
  }
  return (
    <div className='container mx-auto'>
      <div className='py-2'>
        <Title title='Kết quả phục vụ cộng đồng' />
      </div>
      <div>
        <div className='py-2 w-15%'>
          <InputSelect
            options={options}
            value={selected}
            onChange={setSelected}
          />
        </div>
        <Table header={dataTable.header}>{renderBodyTable()}</Table>
        <div className='flex  py-2 justify-end gap-4'>
          {checkRoles([ROLES.truongKhoa], [role]) && shouldShowButton() && (
            <Button label='Xác nhận' />
          )}
          <Button label='Xuất file' />
        </div>
      </div>
    </div>
  )
}
