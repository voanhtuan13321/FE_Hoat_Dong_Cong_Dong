import React, { useEffect, useState } from 'react'
import Title from '../components/Title'
import Table from '../components/Table'
import InputSelect from '../components/Input/InputSelect'
import Button from '../components/Button'
import { useSelector } from 'react-redux'
import {
  ROLES,
  callApiApproveMajorCommunityActivitiesByMajorHead,
  callApiGetMajorsListByMajorHeadId,
  callApiGetUserCommunityActivitiesSumScoreHeadTeachersConfirmed,
  checkRoles2,
  generateAcademyYearOptions,
  getUserId,
  handleError,
} from '../utils'
import { useNavigate } from 'react-router-dom'
import ItemRowHoatDongCongDongCuaKhoa from '../components/ItemRow/ItemRowHoatDongCongDongCuaKhoa'
import ItemRowNoData from '../components/ItemRow/ItemRowNoData'

const HEADER_TABE = [
  { className: 'w-5%', title: 'stt' },
  { className: 'w-20%', title: 'Mã Sinh Viên' },
  { className: '', title: 'Họ và tên' },
  { className: 'w-20%', title: 'Lớp' },
  { className: 'w-20%', title: 'Điểm' },
]

export default function HoatDongCongDongCuaKhoa() {
  const role = useSelector(state => state.role)
  const [communitiActivities, setCommunityActivities] = useState([])
  const academyYearOptions = generateAcademyYearOptions()
  const [selectedAcademyYear, setSelectedAcademyYear] = useState(
    academyYearOptions[0],
  )
  const [majorOptions, setMajorOptions] = useState([])
  const [selectMajor, setSelectMajor] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    fetchMajors()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    fetchCommiunityActivities()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectMajor, selectedAcademyYear])

  const fetchCommiunityActivities = async () => {
    if (selectMajor?.value && selectedAcademyYear?.value) {
      try {
        const data =
          await callApiGetUserCommunityActivitiesSumScoreHeadTeachersConfirmed(
            selectMajor?.value,
            selectedAcademyYear?.value,
          )
        setCommunityActivities(data)
        // console.log(data)
      } catch (error) {
        console.error(error)
        handleError(error, navigator)
      }
    }
  }

  const fetchMajors = async () => {
    const userId = getUserId()
    if (userId) {
      try {
        const data = await callApiGetMajorsListByMajorHeadId(userId)
        const result = data.map(mj => ({ ...mj, value: mj.id }))
        setMajorOptions(result)
        setSelectMajor(result[0])
      } catch (error) {
        console.error(error)
        handleError(error, navigate)
      }
    }
  }

  const shouldShowButton = () => {
    const currentYear = new Date().getFullYear()
    return currentYear === selectedAcademyYear.value
  }

  const handleAccept = async () => {
    if (selectMajor?.value) {
      try {
        console.log(selectMajor.value)
        const data = await callApiApproveMajorCommunityActivitiesByMajorHead(
          selectMajor.value,
          new Date().getFullYear(),
        )
        fetchCommiunityActivities()
      } catch (error) {
        console.error(error)
        handleError(error, navigate)
      }
    }
  }

  const checkAcceptedAll = () =>
    communitiActivities?.some(item => item.sumScoreHeadTeacherConfirmed > 0)

  const renderBodyTable = () => {
    return communitiActivities?.length === 0
      ? [<ItemRowNoData key={-1} colSpan={10} />]
      : communitiActivities?.map((data, index) => (
          <ItemRowHoatDongCongDongCuaKhoa
            key={index}
            index={index}
            data={data}
          />
        ))
  }

  return (
    <div className='container mx-auto'>
      <div className='py-2'>
        <Title title='Kết quả phục vụ cộng đồng' />
      </div>
      <div>
        <div className='py-2 flex gap-1 items-center'>
          <span className='text-main font-bold text-primary'>Khoa: </span>
          <div className='w-15% '>
            <InputSelect
              options={majorOptions}
              value={selectMajor}
              onChange={setSelectMajor}
            />
          </div>
          <span className='text-main font-bold text-primary'>Năm: </span>
          <div className='w-5% '>
            <InputSelect
              options={academyYearOptions}
              value={selectedAcademyYear}
              onChange={setSelectedAcademyYear}
            />
          </div>
        </div>
        <Table header={HEADER_TABE}>{renderBodyTable()}</Table>
        <div className='flex  py-2 justify-end gap-4'>
          {checkRoles2([ROLES.truongKhoa], [role]) &&
            shouldShowButton() &&
            checkAcceptedAll() &&
            communitiActivities?.length > 0 && (
              <Button label='Xác nhận' onClick={handleAccept} />
            )}
          {communitiActivities?.length > 0 && <Button label='Xuất file' />}
        </div>
      </div>
    </div>
  )
}
