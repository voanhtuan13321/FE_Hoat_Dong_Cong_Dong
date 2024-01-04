import React, { useEffect, useState } from 'react'
import Table from '../components/Table'
import Title from '../components/Title'
import ItemRowDanhSachSinhVienAdmin from '../components/ItemRowDanhSachSinhVienAdmin'
import ItemAddRowDanhSachSinhVienAdmin from '../components/ItemAddRowDanhSachSinhVienAdmin'
import Button from '../components/Button'
import InputSelect from '../components/InputSelect'
import {
  callApiGetMajorsList,
  generateAcademyYearOptions,
  handleError,
} from '../utils'
import { useDispatch } from 'react-redux'
import { setLoading } from '../redux/storeSlice'
import { useNavigate } from 'react-router-dom'

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
  const academyYearOptions = generateAcademyYearOptions()

  const [data, setData] = useState([])
  const [isShowAddNew, setShowAddNew] = useState(false)
  const [majorOptions, setMajorOptions] = useState([])
  const [selectedMajor, setSelectedMajor] = useState({})
  const [selectedAcademyYear, setSelectedAcademyYear] = useState(
    academyYearOptions[0],
  )
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    setData(dataTable.value)
    fetchMajors()
  }, [])

  const fetchMajors = async () => {
    try {
      dispatch(setLoading(true))
      const data = await callApiGetMajorsList()
      const result = data.map(item => ({
        ...item,
        name: item.name,
        value: item.id,
      }))
      // console.log(data)
      setMajorOptions(result)
      setSelectedMajor(result[0])
    } catch (error) {
      console.error(error)
      handleError(error, navigate)
    } finally {
      dispatch(setLoading(false))
    }
  }

  const renderBodyTable = () => {
    let arrJsx = data?.map((dt, index) => (
      <ItemRowDanhSachSinhVienAdmin key={index} data={dt} index={index} />
    ))

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
        <div className='flex items-center justify-between mt-3'>
          <div className='flex items-center gap-2'>
            <span className='font-bold text-primary text-main'>
              Thuộc khoa:
            </span>
            <div className='w-48'>
              <InputSelect
                options={majorOptions}
                value={selectedMajor}
                onChange={setSelectedMajor}
              />
            </div>
            <span className='font-bold text-primary text-main'>Lớp:</span>
            <div className='w-48'>
              <InputSelect
                options={academyYearOptions}
                value={selectedAcademyYear}
                onChange={setSelectedAcademyYear}
              />
            </div>
          </div>
          {!isShowAddNew && (
            <Button
              type='add'
              label='thêm'
              onClick={() => setShowAddNew(true)}
            />
          )}
        </div>
        <div className='my-2'>
          <Table header={dataTable.header}>{renderBodyTable()}</Table>
        </div>
      </div>
    </>
  )
}
