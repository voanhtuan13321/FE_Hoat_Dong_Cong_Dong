import React, { useEffect, useState } from 'react'
import DialogCustom from '.'
import {
  COMMUNITY_ACTIVITY_APPROVAL_PERIOD,
  callApiGetSettings,
  callApiGetUserCommunityActivities,
  generateAcademyYearOptions,
  handleError,
} from '../../utils'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ItemRowNoData from '../ItemRow/ItemRowNoData'
import ItemRowTableDetailHoatDong from '../ItemRow/ItemRowTableDetailHoatDong'
import Table from '../Table'
import Button from '../Button'
import InputSelect from '../Input/InputSelect'
import ItemRowTableDetailHoatDongAdmin from '../ItemRow/ItemRowTableDetailHoatDongAdmin'
import ItemRowTableTuDanhGiaAdd from '../ItemRow/ItemRowTableTuDanhGiaAdd'
import ItemRowTableDetailHoatDongAdminAdd from '../ItemRow/ItemRowTableDetailHoatDongAdminAdd'

const HEADER_TABLE = [
  { className: 'w-5%', title: 'stt' },
  { className: 'w-25%', title: 'loại hoạt động' },
  { className: 'w-25%', title: 'tên hoạt động' },
  { className: 'w-5%', title: 'khung điểm' },
  { className: 'w-5%', title: 'điểm tự đánh giá' },
  { className: 'w-5%', title: 'điểm ban cán sự đánh giá' },
  { className: '', title: 'link minh chứng' },
  { className: 'w-10%', title: 'trạng thái' },
]

export default function DialogDetailCommunityActivityStudentAdmin({
  userId,
  isShowDialog,
  setShowDialog,
  studentName,
  refresh2,
}) {
  const role = useSelector(state => state.role)
  const academyYearOptions = generateAcademyYearOptions()

  const [setting, setSetting] = useState({})
  const [isShowAddNew, setShowAddNew] = useState(false)
  const [communityActivities, setCommunityActivities] = useState([])
  const [selectedAcademyYear, setSelectedAcademyYear] = useState(academyYearOptions[0])
  const navigate = useNavigate()

  useEffect(() => {
    fetchSettings(COMMUNITY_ACTIVITY_APPROVAL_PERIOD)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    fetchCommunityActivities()
  }, [selectedAcademyYear, userId])

  const fetchSettings = async name => {
    try {
      const data = await callApiGetSettings(name)
      setSetting(data)
      // console.log(data)
    } catch (error) {
      console.error(error)
      handleError(error, navigate)
    }
  }

  const fetchCommunityActivities = async () => {
    if (userId) {
      try {
        const data = await callApiGetUserCommunityActivities(userId, selectedAcademyYear.value)
        console.log('data', data)
        setCommunityActivities(data)
      } catch (error) {
        console.error(error)
        handleError(error, navigate)
      }
    }
  }

  const renderBodyTable = () => {
    let arrJsx =
      communityActivities.length === 0
        ? [<ItemRowNoData key={-1} colSpan={10} />]
        : communityActivities.map((data, index) => (
            <ItemRowTableDetailHoatDongAdmin
              key={index}
              index={index}
              data={data}
              refresh={fetchCommunityActivities}
              refresh2={refresh2}
              academyYear={selectedAcademyYear.value}
            />
          ))
    isShowAddNew &&
      (arrJsx = [
        ...arrJsx,
        <ItemRowTableDetailHoatDongAdminAdd
          key={-2}
          userId={userId}
          setShowAddNew={setShowAddNew}
          refresh={fetchCommunityActivities}
          year={selectedAcademyYear.value}
        />,
      ])

    return arrJsx
  }

  return (
    <DialogCustom isOpen={isShowDialog} title={`chi tiết hoạt động cộng đồng của sinh viên ${studentName}`}>
      <div className='mx-auto w-[1600px]'>
        <div>
          <div className='flex justify-between'>
            <div className='w-5%'>
              <InputSelect options={academyYearOptions} value={selectedAcademyYear} onChange={setSelectedAcademyYear} />
            </div>
            {!isShowAddNew && <Button label='thêm' type='add' onClick={() => setShowAddNew(true)} />}
          </div>
          <div className='my-2'>
            <Table header={HEADER_TABLE}>{renderBodyTable()}</Table>
          </div>
          <div className='flex justify-end'>
            <Button label='Huỷ' type='outline' onClick={() => setShowDialog(false)} />
          </div>
          <div className='h-[200px]'></div>
        </div>
      </div>
    </DialogCustom>
  )
}
