import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Title from '../components/Title'
import Table from '../components/Table'
import Button from '../components/Button'
import InputSelect from '../components/Input/InputSelect'
import ItemRowNoData from '../components/ItemRow/ItemRowNoData'
import ItemRowHoatDongCongDongCuaTruongAdmin from '../components/ItemRow/ItemRowHoatDongCongDongCuaTruongAdmin'

import {
  callApiGetUserCommunityActivitiesSumScoreMajorHeadsConfimed,
  generateAcademyYearOptions,
  handleError,
} from '../utils'

const HEADER_TABLE = [
  { className: 'w-5%', title: 'STT' },
  { className: 'w-20%', title: 'Mã sinh viên' },
  { className: '', title: 'Họ và tên' },
  { className: 'w-20%', title: 'Lớp' },
  { className: 'w-20%', title: 'Điểm' },
]

export default function AdminHoatDongCongDongCuaTruong() {
  const academyYearOptions = generateAcademyYearOptions()
  const [selectedAcademyYear, setSelectedAcademyYear] = useState(
    academyYearOptions[0],
  )
  const [communityActivities, setCommunityActivities] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    fetchCommunityActivities()
  }, [selectedAcademyYear])

  const fetchCommunityActivities = async () => {
    if (selectedAcademyYear?.value) {
      try {
        const data =
          await callApiGetUserCommunityActivitiesSumScoreMajorHeadsConfimed(
            selectedAcademyYear.value,
          )
        // console.log(data)
        setCommunityActivities(
          data.sort((item1, item2) =>
            item1.classId.localeCompare(item2.classId),
          ),
        )
      } catch (error) {
        console.error(error)
        handleError(error, navigate)
      }
    }
  }

  const renderBodyTable = () => {
    return communityActivities?.length === 0
      ? [<ItemRowNoData key={-1} colSpan={15} />]
      : communityActivities.map((dt, index) => (
          <ItemRowHoatDongCongDongCuaTruongAdmin
            key={index}
            index={index}
            dt={dt}
          />
        ))
  }

  return (
    <>
      <div className='container mx-auto'>
        <div className='p-2'>
          <Title title='Danh sách sinh viên của trường' />
        </div>
        <div className='p-2'>
          <div className='flex justify-between pb-2'>
            <div className='w-5%'>
              <InputSelect
                options={academyYearOptions}
                value={selectedAcademyYear}
                onChange={setSelectedAcademyYear}
              />
            </div>
            <Button label={'Xuất file'} />
          </div>
          <Table header={HEADER_TABLE}>{renderBodyTable()}</Table>
        </div>
      </div>
    </>
  )
}
