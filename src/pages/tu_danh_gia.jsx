import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import queryString from 'query-string'
import { useLocation, useNavigate } from 'react-router-dom'

import InputSelect from '../components/Input/InputSelect'
import Button from '../components/Button'
import Table from '../components/Table'
import Title from '../components/Title'
import ItemRowTableTuDanhGia from '../components/ItemRow/ItemRowTableTuDanhGia'
import ItemRowNoData from '../components/ItemRow/ItemRowNoData'
import ItemRowTableTuDanhGiaAdd from '../components/ItemRow/ItemRowTableTuDanhGiaAdd'

import {
  ROLES,
  callApiGetUserCommunityActivities,
  checkIsCurrentYear,
  checkRoles2,
  generateAcademyYearOptions,
  getUserId,
  handleError,
} from '../utils'

export default function TuDanhGia() {
  const role = useSelector(state => state.role)
  const academyYearOptions = generateAcademyYearOptions()

  const [isShowAddNew, setShowAddNew] = useState(false)
  const [communityActivities, setCommunityActivities] = useState([])
  const [selectedAcademyYear, setSelectedAcademyYear] = useState(
    academyYearOptions[0],
  )
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const { studentId } = queryString.parse(location.search)
    console.log('param', studentId)
    fetchCommunityActivities(studentId)
  }, [])

  const fetchCommunityActivities = async id => {
    const userId = id || getUserId()

    if (!userId) return

    try {
      const data = await callApiGetUserCommunityActivities(
        userId,
        selectedAcademyYear.value,
      )
      // console.log(data)
      setCommunityActivities(data)
    } catch (error) {
      console.error(error)
      handleError(error, navigate)
    }
  }

  const onClickXacNhanThamGia = () => {
    alert('Xac Nhan tham gia')
  }

  const genHeaderByRole = () => {
    const header = [
      { className: 'w-5%', title: 'stt' },
      { className: 'w-10%', title: 'loại hoạt động' },
      { className: 'w-20%', title: 'tên hoạt động' },
      { className: 'w-5%', title: 'khung điểm' },
      { className: 'w-5%', title: 'điểm tự đánh giá' },
      { className: 'w-5%', title: 'điểm ban cán sự đánh giá' },
      { className: '', title: 'link minh chứng' },
    ]
    if (checkRoles2([ROLES.giaoVien, ROLES.truongKhoa], [role])) {
      return [...header, { className: 'w-5%', title: 'xác nhận' }]
    }
    return [...header, { className: 'w-5%', title: '' }]
  }

  const renderBodyTable = () => {
    let arrJsx =
      communityActivities.length === 0
        ? [<ItemRowNoData key={-1} colSpan={10} />]
        : communityActivities.map((data, index) => (
            <ItemRowTableTuDanhGia
              key={index}
              index={index}
              data={data}
              refresh={fetchCommunityActivities}
              academyYear={selectedAcademyYear.value}
            />
          ))
    isShowAddNew &&
      (arrJsx = [
        ...arrJsx,
        <ItemRowTableTuDanhGiaAdd
          key={-2}
          setShowAddNew={setShowAddNew}
          refresh={fetchCommunityActivities}
        />,
      ])
    return arrJsx
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
            {!checkRoles2([ROLES.giaoVien, ROLES.truongKhoa], [role]) &&
              !isShowAddNew &&
              checkIsCurrentYear(selectedAcademyYear.value) && (
                <Button
                  label='thêm'
                  type='add'
                  onClick={() => setShowAddNew(true)}
                />
              )}
          </div>
        </div>
        <div className='my-2'>
          <Table header={genHeaderByRole()}>{renderBodyTable()}</Table>
        </div>
        {/* {!checkRoles2([ROLES.giaoVien, ROLES.truongKhoa], [role]) &&
          checkIsCurrentYear(selectedAcademyYear.value) && (
            <div className='flex justify-end gap-2'>
              <Button
                label='xác nhận tham gia'
                onClick={onClickXacNhanThamGia}
              />
            </div>
          )} */}
      </div>
    </div>
  )
}
