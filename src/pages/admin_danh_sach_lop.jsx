import React, { useEffect, useState } from 'react'
import Title from '../components/Title'
import InputSelect from '../components/InputSelect'
import Button from '../components/Button'
import Table from '../components/Table'
import ItemRowDanhSachLop from '../components/ItemRowDanhSachLopAdmin'
import ItemRowDanhSachLopAdd from '../components/ItemRowDanhSachLopAdminAdd'
import { generateNamHocOptions, handleError, requestHandler } from '../utils'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setLoading } from '../redux/storeSlice'
import Pagination from '../components/Pagination'

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
      khoa: 2022,
    },
    {
      khoaQuanLy: 2,
      lop: '20C1A',
      giaoVienChuNhiem: 'Nguyễn Văn B',
      khoa: 2024,
    },
  ],
}

export default function AdminDanhSachLop() {
  const optionsNamHoc = generateNamHocOptions(5)

  const [optionsKhoa, setOptionsKhoa] = useState([])
  const [listClass, setListClass] = useState({})
  const [selectedKhoa, setSelectedKhoa] = useState({})
  const [selectedNamHoc, setSelectedNamHoc] = useState(optionsNamHoc[0])
  const [isAddNew, setIsAddNew] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    fetchListKhoa()
  }, [])

  useEffect(() => {
    fetchListClass()
  }, [selectedNamHoc, selectedKhoa])

  const fetchListClass = async (page = 0) => {
    try {
      dispatch(setLoading(true))
      const url = `api/Class/GetClassesPaginationList`
      const config = {
        params: {
          ItemPerPage: 5,
          Page: page,
          AcademyYear: selectedNamHoc.value,
          MajorName: selectedKhoa.name,
        },
      }
      const response = await requestHandler.get(url, config)
      const data = await response.data
      // console.log(data)
      setListClass(data)
    } catch (error) {
      console.error(error)
      handleError(error, navigate)
    } finally {
      dispatch(setLoading(false))
    }
  }

  const fetchListKhoa = async () => {
    try {
      dispatch(setLoading(true))
      const url = `api/Major/GetMajorsList`
      const response = await requestHandler.get(url)
      const data = await response.data.map(item => ({
        ...item,
        name: item.name,
        value: item.id,
      }))
      // console.log(data)
      setOptionsKhoa(data)
      setSelectedKhoa(data[0])
    } catch (error) {
      console.error(error)
      handleError(error, navigate)
    } finally {
      dispatch(setLoading(false))
    }
  }

  const onClickThem = () => setIsAddNew(true)

  const renderBodyTable = () => {
    let arrJsx = listClass.data?.map((dt, index) => (
      <ItemRowDanhSachLop
        key={index}
        dt={dt}
        index={index}
        major={selectedKhoa}
        refresh={fetchListClass}
      />
    ))
    isAddNew &&
      (arrJsx = [
        ...arrJsx,
        <ItemRowDanhSachLopAdd
          key={-1}
          setIsAddNew={setIsAddNew}
          majorId={selectedKhoa.id}
          academicYear={selectedNamHoc.value}
          refresh={fetchListClass}
        />,
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
      <Pagination
        totalItems={listClass.totalItems}
        totalPages={listClass.totalPages}
        itemPerPage={listClass.itemPerPage}
        currentPage={listClass.currentPage}
        isNextPage={listClass.isNextPage}
        isPreviousPage={listClass.isPreviousPage}
        onPageChange={fetchListClass}
      />
    </div>
  )
}
