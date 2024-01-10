import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Title from '../components/Title'
import Table from '../components/Table'
import InputSelect from '../components/Input/InputSelect'
import Button from '../components/Button'
import ItemRowHoatDongCongDongCuaKhoa from '../components/ItemRow/ItemRowHoatDongCongDongCuaKhoa'
import ItemRowNoData from '../components/ItemRow/ItemRowNoData'

import {
  COMMUNITY_ACTIVITY_APPROVAL_PERIOD,
  COMMUNITY_ACTIVITY_APPROVAL_PERIOD_STATUS,
  ROLES,
  callApiApproveMajorCommunityActivitiesByMajorHead,
  callApiGetClassById,
  callApiGetMajorsListByMajorHeadId,
  callApiGetSettings,
  callApiGetUserCommunityActivitiesSumScoreHeadTeachersConfirmed,
  checkAndHandleLogin,
  checkPermissionToAccessThePage,
  checkRoles2,
  exportFileExcel,
  generateAcademyYearOptions,
  getUserId,
  getUserRole,
  handleError,
} from '../utils'
import Swal from 'sweetalert2'

const HEADER_TABE = [
  { className: 'w-5%', title: 'stt' },
  { className: 'w-20%', title: 'Mã Sinh Viên' },
  { className: '', title: 'Họ và tên' },
  { className: 'w-20%', title: 'Lớp' },
  { className: 'w-10%', title: 'Điểm' },
  { className: 'w-10%', title: 'Trạng thái' },
]

export default function HoatDongCongDongCuaKhoa() {
  const role = useSelector(state => state.role)
  const [setting, setSetting] = useState({})
  const [communityActivities, setCommunityActivities] = useState([])
  const academyYearOptions = generateAcademyYearOptions()
  const [selectedAcademyYear, setSelectedAcademyYear] = useState(
    academyYearOptions[0],
  )
  const [majorOptions, setMajorOptions] = useState([])
  const [selectMajor, setSelectMajor] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    checkAndHandleLogin(navigate)
    checkPermissionToAccessThePage(getUserRole(), [ROLES.TRUONG_KHOA], navigate)
    fetchMajors()
    fetchSettings(COMMUNITY_ACTIVITY_APPROVAL_PERIOD)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    fetchCommunityActivities()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectMajor, selectedAcademyYear])

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
    const { isConfirmed } = await Swal.fire({
      title: 'Bạn có chắc muốn xác nhận không?',
      icon: 'question',
      confirmButtonText: 'Xác nhận',
      showCancelButton: true,
      cancelButtonText: 'Huỷ',
    })

    if (isConfirmed && selectMajor?.value) {
      try {
        console.log(selectMajor.value)
        const data = await callApiApproveMajorCommunityActivitiesByMajorHead(
          selectMajor.value,
          new Date().getFullYear(),
        )
        fetchCommunityActivities()
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

    const fileName = `hoat-dong-cong-dong-cua-khoa-${selectMajor.name}-${selectedAcademyYear.value}`

    // Sử dụng Promise.all để đợi tất cả các promise hoàn thành
    const result = await Promise.all(
      communityActivities.map(async (item, index) => ({
        STT: index + 1,
        'MÃ SINH VIÊN': item.studentId,
        'HỌ VÀ TÊN': `${item.firstName} ${item.lastName}`,
        LỚP: await fetchClassName(item.classId),
        ĐIỂM:
          item.sumScoreHeadTeacherConfirmed > 0
            ? item.sumScoreHeadTeacherConfirmed
            : item.sumScoreMajorHeadConfirmed,
        'TRẠNG THÁI': item.sumScoreMajorHeadConfirmed > 0 ? 'Đã xác nhận' : '',
      })),
    )

    exportFileExcel(result, fileName)
  }

  const checkAcceptedAll = () =>
    communityActivities?.some(item => item.sumScoreHeadTeacherConfirmed > 0)

  const renderBodyTable = () => {
    return communityActivities?.length === 0
      ? [<ItemRowNoData key={-1} colSpan={10} />]
      : communityActivities?.map((data, index) => (
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
          {checkRoles2([ROLES.TRUONG_KHOA], [role]) &&
            shouldShowButton() &&
            checkAcceptedAll() &&
            communityActivities?.length > 0 && (
              <>
                {setting.status ===
                COMMUNITY_ACTIVITY_APPROVAL_PERIOD_STATUS.MAJOR_HEAD ? (
                  <Button label='Xác nhận' onClick={handleAccept} />
                ) : (
                  <span className='font-bold text-main text-red-text my-2'>
                    Bạn chưa được phép đánh giá
                  </span>
                )}
              </>
            )}
          <Button label='Xuất file' onClick={handleExportFileExcell} />
        </div>
      </div>
    </div>
  )
}
