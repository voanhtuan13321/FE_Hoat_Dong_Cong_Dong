import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import Title from '../components/Title'
import Button from '../components/Button'
import Table from '../components/Table'
import Pagination from '../components/Pagination'
import ItemRowTableDanhSachThongBaoAdmin from '../components/ItemRowTableDanhSachThongBaoAdmin'
import ItemRowTableDanhSachThongBaoAdminAdd from '../components/ItemRowTableDanhSachThongBaoAdminAdd'

import { ITEM_PER_PAGE, callApiGetAnnouncementsPaginationList } from '../utils'
import { setLoading } from '../redux/storeSlice'

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
  const dispatch = useDispatch()

  useEffect(() => {
    fetchAnnouncements()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchAnnouncements = async (page = 0) => {
    try {
      dispatch(setLoading(true))
      const data = await callApiGetAnnouncementsPaginationList(
        ITEM_PER_PAGE,
        page,
      )
      // console.log(data)
      setObjectAnnouncements(data)
    } catch (error) {
      alert(error.message)
    } finally {
      dispatch(setLoading(false))
    }
  }

  const onClickThem = () => {
    setShowAddNew(true)
  }

  const renderBodyTable = () => {
    let arrJsx = objectAnnouncements.data?.map((dt, index) => (
      <ItemRowTableDanhSachThongBaoAdmin
        key={index}
        stt={index}
        data={dt}
        refresh={fetchAnnouncements}
        objectAnnouncements={objectAnnouncements}
      />
    ))

    isShowAddNew &&
      (arrJsx = [
        ...arrJsx,
        <ItemRowTableDanhSachThongBaoAdminAdd
          key={-1}
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
            <Button type='add' label='thêm' onClick={onClickThem} />
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
