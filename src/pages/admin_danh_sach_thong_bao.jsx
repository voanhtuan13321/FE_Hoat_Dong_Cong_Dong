import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Title from '../components/Title'
import Button from '../components/Button'
import Table from '../components/Table'
import Pagination from '../components/Pagination'
import ItemRowTableDanhSachThongBaoAdmin from '../components/ItemRow/ItemRowTableDanhSachThongBaoAdmin'
import ItemRowTableDanhSachThongBaoAdminAdd from '../components/ItemRow/ItemRowTableDanhSachThongBaoAdminAdd'
import ItemRowNoData from '../components/ItemRow/ItemRowNoData'

import {
  ITEM_PER_PAGE,
  ROLES,
  callApiGetAnnouncementsPaginationList,
  checkAndHandleLogined,
  checkPermissionToAccessThePage,
  getUserRole,
} from '../utils'

const HEADER_TABLE = [
  { className: 'w-5%', title: 'stt' },
  { className: 'w-20%', title: 'tiêu đề' },
  { className: 'w-20%', title: 'thời gian' },
  { className: '', title: 'nội dung' },
  { className: 'w-20%', title: '' },
]

export default function AdminDanhSachThongBao() {
  const [objectAnnouncements, setObjectAnnouncements] = useState({})
  const [isShowAddNew, setShowAddNew] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    checkAndHandleLogined(navigate)
    checkPermissionToAccessThePage(getUserRole(), [ROLES.admin], navigate)
    fetchAnnouncements()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchAnnouncements = async (page = 0) => {
    try {

      const data = await callApiGetAnnouncementsPaginationList(
        ITEM_PER_PAGE,
        page,
      )
      setObjectAnnouncements(data)

    } catch (error) {
      alert(error.message)
    }
  }

  const renderBodyTable = () => {
    let arrJsx =
      objectAnnouncements.data?.length === 0
        ? [<ItemRowNoData key={-1} colSpan={5} />]
        : objectAnnouncements.data?.map((dt, index) => (
            <ItemRowTableDanhSachThongBaoAdmin
              key={index}
              index={index}
              data={dt}
              refresh={fetchAnnouncements}
              objectAnnouncements={objectAnnouncements}
            />
          ))
    isShowAddNew &&
      (arrJsx = [
        ...arrJsx,
        <ItemRowTableDanhSachThongBaoAdminAdd
          key={-2}
          setShowAddNew={setShowAddNew}
          refresh={fetchAnnouncements}
        />,
      ])
    return arrJsx
  }

  return (
    <div className='container mx-auto'>
      <Title title='danh sách thông báo' />
      <div>
        <div className='py-2 text-end'>
          {!isShowAddNew && (
            <Button
              type='add'
              label='thêm'
              onClick={() => setShowAddNew(true)}
            />
          )}
        </div>
        <div>
          <Table header={HEADER_TABLE}>{renderBodyTable()}</Table>
        </div>
        <Pagination
          totalItems={objectAnnouncements.totalItems}
          totalPages={objectAnnouncements.totalPages}
          itemPerPage={objectAnnouncements.itemPerPage}
          currentPage={objectAnnouncements.currentPage}
          isNextPage={objectAnnouncements.isNextPage}
          isPreviousPage={objectAnnouncements.isPreviousPage}
          onPageChange={fetchAnnouncements}
        />
      </div>
    </div>
  )
}
