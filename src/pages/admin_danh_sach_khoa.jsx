import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import Title from '../components/Title'
import Table from '../components/Table/index'
import Button from '../components/Button'
import ItemRowTableDanhSachKhoaAdmin from '../components/ItemRow/ItemRowTableDanhSachKhoaAdmin'
import ItemRowTableDanhSachKhoaAdminAdd from '../components/ItemRow/ItemRowTableDanhSachKhoaAdminAdd'
import Pagination from '../components/Pagination'

import {
  ITEM_PER_PAGE,
  ROLES,
  callApiGetMajorsPaginationList,
  checkAndHandleLogin,
  checkPermissionToAccessThePage,
  getUserRole,
} from '../utils'
import { setLoading } from '../redux/storeSlice'
import ItemRowNoData from '../components/ItemRow/ItemRowNoData'
import { useNavigate } from 'react-router-dom'

const HEADER_TABLE = [
  { className: 'w-5%', title: 'stt' },
  { className: 'w-25%', title: 'Tên khoa' },
  { className: '', title: 'Trưởng khoa' },
  { className: 'w-10%', title: '' },
]

export default function AdminDanhSachKhoa() {
  const [objectMajors, setObjectMajors] = useState({})
  const [isShowAddNew, setShowAddNew] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    checkAndHandleLogin(navigate)
    checkPermissionToAccessThePage(getUserRole(), [ROLES.ADMIN], navigate)
    fetchListKhoa()
  }, [])

  const fetchListKhoa = async (page = 0) => {
    try {
      const data = await callApiGetMajorsPaginationList(ITEM_PER_PAGE, page)
      setObjectMajors(data)
    } catch (error) {
      alert(error.message)
    } finally {
      dispatch(setLoading(false))
    }
  }

  const renderBodyTable = () => {
    let arrJsx =
      objectMajors.data?.length === 0
        ? [<ItemRowNoData key={-1} colSpan={10} />]
        : objectMajors.data?.map((dt, index) => (
            <ItemRowTableDanhSachKhoaAdmin
              key={index}
              stt={index}
              data={dt}
              refresh={() => fetchListKhoa(objectMajors.currentPage)}
            />
          ))

    isShowAddNew &&
      (arrJsx = [
        ...arrJsx,
        <ItemRowTableDanhSachKhoaAdminAdd
          key={-2}
          setShowAddNew={setShowAddNew}
          refresh={() => fetchListKhoa(objectMajors.currentPage)}
          objectMajors={objectMajors}
        />,
      ])

    return arrJsx
  }

  return (
    <>
      <div className='container mx-auto py-2'>
        <Title title={'Danh sách khoa'} />

        <div className='flex justify-end my-2'>
          {!isShowAddNew && (
            <Button
              label='Thêm'
              type='add'
              onClick={() => setShowAddNew(true)}
            />
          )}
        </div>
        <div className='pb-[88px]'>
          <Table header={HEADER_TABLE}>{renderBodyTable()}</Table>
        </div>
        {objectMajors.totalPages > 1 && (
          <Pagination
            totalItems={objectMajors.totalItems}
            totalPages={objectMajors.totalPages}
            itemPerPage={objectMajors.itemPerPage}
            currentPage={objectMajors.currentPage}
            isNextPage={objectMajors.isNextPage}
            isPreviousPage={objectMajors.isPreviousPage}
            onPageChange={fetchListKhoa}
          />
        )}
      </div>
    </>
  )
}
