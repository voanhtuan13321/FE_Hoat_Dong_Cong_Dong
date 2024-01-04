import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Title from '../components/Title'
import InputSelect from '../components/InputSelect'
import Button from '../components/Button'
import Table from '../components/Table'
import ItemRowDanhSachLop from '../components/ItemRowDanhSachLopAdmin'
import ItemRowDanhSachLopAdd from '../components/ItemRowDanhSachLopAdminAdd'
import Pagination from '../components/Pagination'

import { setLoading } from '../redux/storeSlice'
import {
  ITEM_PER_PAGE,
  callApiGetClassesPaginationList,
  callApiGetMajorsList,
  generateAcademyYearOptions,
  handleError,
} from '../utils'

const HEADER_TABLE = [
  { className: 'w-5%', title: 'stt' },
  { className: 'w-20%', title: 'Khoa quản lý' },
  { className: 'w-10%', title: 'Lớp' },
  { className: 'w-10%', title: 'Giáo viên chủ nhiệm' },
  { className: 'w-10%', title: 'khóa' },
  { className: 'w-20%', title: '' },
]

export default function AdminDanhSachLop() {
  const optionsNamHoc = generateAcademyYearOptions()

  const [optionsKhoa, setOptionsKhoa] = useState([])
  const [listClass, setListClass] = useState({})
  const [selectedKhoa, setSelectedKhoa] = useState({})
  const [selectedNamHoc, setSelectedNamHoc] = useState(optionsNamHoc[0])
  const [isAddNew, setIsAddNew] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    fetchMajors()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    fetchClasses()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedNamHoc, selectedKhoa])

  const fetchClasses = async (page = 0) => {
    try {
      dispatch(setLoading(true))
      const data = await callApiGetClassesPaginationList(
        ITEM_PER_PAGE,
        page,
        selectedNamHoc.value,
        selectedKhoa.name,
      )
      // console.log(data)
      setListClass(data)
    } catch (error) {
      console.error(error)
      handleError(error, navigate)
    } finally {
      dispatch(setLoading(false))
    }
  }

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
      setOptionsKhoa(result)
      setSelectedKhoa(result[0])
    } catch (error) {
      console.error(error)
      handleError(error, navigate)
    } finally {
      dispatch(setLoading(false))
    }
  }

  const renderBodyTable = () => {
    let arrJsx = listClass.data?.map((dt, index) => (
      <ItemRowDanhSachLop
        key={index}
        dt={dt}
        index={index}
        major={selectedKhoa}
        refresh={fetchClasses}
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
          refresh={fetchClasses}
        />,
      ])
    return arrJsx
  }

  return (
    <div className='container mx-auto'>
      <Title title='danh sách lớp' />
      <div className='mt-3'>
        <div className='flex items-center justify-between gap-2'>
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
              <Button
                label='thêm'
                type='add'
                onClick={() => setIsAddNew(true)}
              />
            </div>
          )}
        </div>
      </div>
      <div className='my-2'>
        <Table header={HEADER_TABLE}>{renderBodyTable()}</Table>
      </div>
      <Pagination
        totalItems={listClass.totalItems}
        totalPages={listClass.totalPages}
        itemPerPage={listClass.itemPerPage}
        currentPage={listClass.currentPage}
        isNextPage={listClass.isNextPage}
        isPreviousPage={listClass.isPreviousPage}
        onPageChange={fetchClasses}
      />
    </div>
  )
}
