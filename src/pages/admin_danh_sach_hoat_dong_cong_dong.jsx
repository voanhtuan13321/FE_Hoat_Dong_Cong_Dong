import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Title from '../components/Title'
import Table from '../components/Table'
import Button from '../components/Button'
import Pagination from '../components/Pagination'
import ItemRowDanhSachHoatDongCongDongAdmin from '../components/ItemRow/ItemRowRowDanhSachHoatDongCongDongAdmin'
import ItemRowDanhSachHoatDongCongDongAdminAdd from '../components/ItemRow/ItemRowDanhSachHoatDongCongDongAdminAdd'
import ItemRowNoData from '../components/ItemRow/ItemRowNoData'

import {
  ITEM_PER_PAGE,
  ROLES,
  callApiGetCommunityActivityTypesPaginationList,
  checkAndHandleLogined,
  checkPermissionToAccessThePage,
  getUserRole,
} from '../utils'

const HEADER_TABLE = [
  { className: 'w-5%', title: 'stt' },
  { className: '', title: 'Loại hoạt động cộng đồng' },
  { className: 'w-15%', title: 'Min điểm' },
  { className: 'w-15%', title: 'Max điểm' },
  { className: 'w-20%', title: '' },
]

export default function AdminDanhSachHoatDongCongDong() {
  const [listCommunityActivity, setListCommunityActivity] = useState({})
  const [addButtonDisabled, setAddButtonDisabled] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    checkAndHandleLogined(navigate)
    checkPermissionToAccessThePage(getUserRole(), [ROLES.admin], navigate)
    fetchListCommunityActivity()
  }, [])

  const fetchListCommunityActivity = async (page = 0) => {
    try {
      const data = await callApiGetCommunityActivityTypesPaginationList(
        ITEM_PER_PAGE,
        page,
      )
      setListCommunityActivity(data)
    } catch (error) {
      alert(error.message)
    }
  }

  const handleAddRow = () => {
    setAddButtonDisabled(true)
  }

  const renderBodyTable = () => {
    let arrJsx =
      listCommunityActivity.data?.length === 0
        ? [<ItemRowNoData key={-1} colSpan={5} />]
        : listCommunityActivity.data?.map((dt, index) => (
            <ItemRowDanhSachHoatDongCongDongAdmin
              key={index}
              index={index}
              data={dt}
              refresh={fetchListCommunityActivity}
              listCommunityActivity={listCommunityActivity}
            />
          ))
    addButtonDisabled &&
      (arrJsx = [
        ...arrJsx,
        <ItemRowDanhSachHoatDongCongDongAdminAdd
          key={-2}
          setAddButtonDisabled={setAddButtonDisabled}
          refresh={fetchListCommunityActivity}
        />,
      ])

    return arrJsx
  }

  return (
    <div className='container p-2 justify-center m-auto'>
      <Title title={'Danh sách các hoạt động cộng đồng'} />
      <div className='py-2 pb-[88px]'>
        <div className='text-end py-2'>
          {!addButtonDisabled && (
            <Button type={'add'} label={'Thêm'} onClick={handleAddRow} />
          )}
        </div>
        <Table header={HEADER_TABLE}>{renderBodyTable()}</Table>
      </div>
      <Pagination
        totalItems={listCommunityActivity.totalItems}
        totalPages={listCommunityActivity.totalPages}
        itemPerPage={listCommunityActivity.itemPerPage}
        currentPage={listCommunityActivity.currentPage}
        isNextPage={listCommunityActivity.isNextPage}
        isPreviousPage={listCommunityActivity.isPreviousPage}
        onPageChange={fetchListCommunityActivity}
      />
    </div>
  )
}
