import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import queryString from 'query-string'

import InputSelect from '../components/Input/InputSelect'
import Button from '../components/Button'
import Table from '../components/Table'
import Title from '../components/Title'
import ItemRowTableTuDanhGia from '../components/ItemRow/ItemRowTableTuDanhGia'

import { ROLES, checkRoles2, generateAcademyYearOptions } from '../utils'
import { useLocation, useNavigate } from 'react-router-dom'

const dataTable = {
  header: [
    { className: 'w-5%', title: 'stt' },
    { className: 'w-20%', title: 'loại hoạt động' },
    { className: 'w-10%', title: 'khung điểm' },
    { className: 'w-10%', title: 'điểm tự đánh giá' },
    { className: 'w-10%', title: 'điểm ban cán sự đánh giá' },
    { className: '', title: 'link minh chứng' },
    { className: 'w-5%', title: '' },
  ],
  value: [
    {
      loaiHoatDong: 1,
      diemTuDanhGia: 150,
      diemBanCanSuDanhGia: 110,
      linkMinhChung: 'facebook.com',
    },
    {
      loaiHoatDong: 2,
      diemTuDanhGia: 150,
      diemBanCanSuDanhGia: 110,
      linkMinhChung: 'facebook.com',
    },
  ],
}

export default function TuDanhGia() {
  const academyYearOptions = generateAcademyYearOptions()
  const role = useSelector(state => state.role)

  const [listTuDanhGia, setListTuDanhGia] = useState(dataTable.value)
  const [selectedAcademyYear, setSelectedAcademyYear] = useState(
    academyYearOptions[0],
  )
  const navigate = useNavigate()
  const location = useLocation()

  const onClickAdd = () => {}

  useEffect(() => {
    const { studentId } = queryString.parse(location.search)
    console.log(studentId)
  }, [])

  const onClickXacNhanThamGia = () => {
    alert('Xac Nhan tham gia')
  }

  const genHeaderByRole = () => {
    const header = [
      { className: 'w-5%', title: 'stt' },
      { className: 'w-20%', title: 'loại hoạt động' },
      { className: 'w-10%', title: 'khung điểm' },
      { className: 'w-10%', title: 'điểm tự đánh giá' },
      { className: 'w-10%', title: 'điểm ban cán sự đánh giá' },
      { className: '', title: 'link minh chứng' },
    ]
    if (checkRoles2([ROLES.giaoVien, ROLES.truongKhoa], [role])) {
      return [...header, { className: 'w-5%', title: 'xác nhận' }]
    }
    return [...header, { className: 'w-5%', title: '' }]
  }

  const renderBodyTable = () => {
    return listTuDanhGia.map((dt, index) => (
      <ItemRowTableTuDanhGia key={index} index={index} data={dt} />
    ))
  }

  return (
    <div className='container mx-auto'>
      <Title title='tự đánh giá' />
      <div className='mt-3'>
        <div className='flex items-center gap-2 '>
          <span className='font-bold text-primary text-main'>
            Năm đánh giá:
          </span>
          <div className='w-48'>
            <InputSelect
              options={academyYearOptions}
              value={selectedAcademyYear}
              onChange={setSelectedAcademyYear}
            />
          </div>
        </div>
        <p className='font-bold text-main text-red-text my-2'>
          ** Bạn chưa được phép đánh giá học kỳ này **
        </p>
      </div>
      <div>
        <div className='flex justify-between items-center'>
          <h3 className='uppercase font-bold'>nội dung tự đánh giá</h3>
          <div>
            {!checkRoles2([ROLES.giaoVien, ROLES.truongKhoa], [role]) && (
              <Button label='thêm' type='add' onClick={onClickAdd} />
            )}
          </div>
        </div>
        <div className='my-2'>
          <Table header={genHeaderByRole()}>{renderBodyTable()}</Table>
        </div>
        {!checkRoles2([ROLES.giaoVien, ROLES.truongKhoa], [role]) && (
          <div className='flex justify-end gap-2'>
            <Button label='xác nhận tham gia' onClick={onClickXacNhanThamGia} />
          </div>
        )}
      </div>
    </div>
  )
}
