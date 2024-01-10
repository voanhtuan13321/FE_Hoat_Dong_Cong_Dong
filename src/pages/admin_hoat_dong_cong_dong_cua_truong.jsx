import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Title from '../components/Title'
import Table from '../components/Table'
import Button from '../components/Button'
import InputSelect from '../components/Input/InputSelect'
import ItemRowNoData from '../components/ItemRow/ItemRowNoData'
import ItemRowHoatDongCongDongCuaTruongAdmin from '../components/ItemRow/ItemRowHoatDongCongDongCuaTruongAdmin'

import {
  ROLES,
  callApiGetClassById,
  callApiGetUserCommunityActivitiesSumScoreMajorHeadsConfimed,
  checkAndHandleLogin,
  checkPermissionToAccessThePage,
  exportFileExcel,
  generateAcademyYearOptions,
  getUserRole,
  handleError,
} from '../utils'
import Swal from 'sweetalert2'

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
    checkAndHandleLogin(navigate)
    checkPermissionToAccessThePage(getUserRole(), [ROLES.ADMIN], navigate)
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

  const fetchClassName = async classId => {
    try {
      const { name } = await callApiGetClassById(classId)
      return name
    } catch (error) {
      console.error(error)
      handleError(error, navigate)
    }
  }

  const handleExportFileExcell = async () => {
    if (communityActivities.length === 0) {
      Swal.fire('Danh sách rỗng', '', 'info')
      return
    }

    const fileName = `hoat-dong-cong-dong-cua-truong-${selectedAcademyYear.value}`

    // Sử dụng Promise.all để đợi tất cả các promise hoàn thành
    const result = await Promise.all(
      communityActivities.map(async (item, index) => ({
        STT: index + 1,
        'MÃ SINH VIÊN': item.studentId,
        'HỌ VÀ TÊN': `${item.firstName} ${item.lastName}`,
        LỚP: await fetchClassName(item.classId),
        ĐIỂM: item.sumScoreMajorHeadConfirmed,
      })),
    )

    exportFileExcel(result, fileName)
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
          <Title title='Hoạt động cộng đồng của trường' />
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
            <Button label='Xuất file' onClick={handleExportFileExcell} />
          </div>
          <Table header={HEADER_TABLE}>{renderBodyTable()}</Table>
        </div>
      </div>
    </>
  )
}
