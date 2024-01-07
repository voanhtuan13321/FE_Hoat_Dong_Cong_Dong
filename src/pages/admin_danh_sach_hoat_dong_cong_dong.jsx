import React, { useEffect, useState } from 'react'
import Title from '../components/Title'
import Table from '../components/Table'
import Button from '../components/Button'
import ItemRowDanhSachHoatDongCongDongAdmin from '../components/ItemRow/ItemRowDanhSachHoatDongCongDongAdmin'
import ItemRowDanhSachHoatDongCongDongAdminAdd from '../components/ItemRow/ItemRowDanhSachHoatDongCongDongAdminAdd'
import { requestHandler } from '../utils'
import { useDispatch } from 'react-redux'
import { setLoading } from '../redux/storeSlice'
import Pagination from '../components/Pagination'
import { checkAndHandleLogined } from '../utils'
import { useNavigate } from 'react-router-dom'


const dataTable = {
  header: [
    { className: 'w-5%', title: 'stt' },
    { className: '', title: 'Loại hoạt động cộng đồng' },
    { className: 'w-15%', title: 'Min điểm' },
    { className: 'w-15%', title: 'Max điểm' },
    { className: 'w-20%', title: '' },
  ],
}

export default function AdminDanhSachHoatDongCongDong() {
  const [listHDCD, setListHDCD] = useState([])
  const [addButtonDisabled, setAddButtonDisabled] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()


  useEffect(() => {
    checkAndHandleLogined(navigate)
    fetchListHDCD()
  }, [])

  const fetchListHDCD = async (page = 0) => {
    try {
      dispatch(setLoading(true))
      const url = `api/CommunityActivityType/GetCommunityActivityTypesPaginationList`
      const config = { params: { ItemPerPage: 5, Page: page } }
      const response = await requestHandler.get(url, config)
      const data = await response.data
      console.log(data)
      setListHDCD(data)
    } catch (error) {
      alert(error.message)
    } finally {
      dispatch(setLoading(false))
    }
  }

  const handleAddRow = () => {
    setAddButtonDisabled(true)
  }

  const renderBodyTable = () => {
    let arrJsx = listHDCD.data?.map((dt, index) => (
        <ItemRowDanhSachHoatDongCongDongAdmin
          key={index}
          index={index}
          data={dt}
          refresh={fetchListHDCD}      
        />
    ))
    addButtonDisabled &&
      (arrJsx = [
        ...arrJsx,
        <ItemRowDanhSachHoatDongCongDongAdminAdd
          key={-1}
          setAddButtonDisabled={setAddButtonDisabled}
          refresh={fetchListHDCD}
        />,
      ])

    return arrJsx
  }

  return (
      <div className='container p-2 justify-center m-auto'>
        <Title title={'Danh sách các hoạt động cộng đồng'} />
        <div className='py-2'>
          <div className='text-end py-2'>
          {!addButtonDisabled && (
            <Button
              type={'add'}
              label={'Thêm'}
              onClick={handleAddRow}
            />
            )}
          </div>
          <Table header={dataTable.header}>{renderBodyTable()}</Table>
        </div>
        <Pagination
          totalItems={listHDCD.totalItems}
          totalPages={listHDCD.totalPages}
          itemPerPage={listHDCD.itemPerPage}
          currentPage={listHDCD.currentPage}
          isNextPage={listHDCD.isNextPage}
          isPreviousPage={listHDCD.isPreviousPage}
          onPageChange={fetchListHDCD}
        />
      </div>
  
  )
}
