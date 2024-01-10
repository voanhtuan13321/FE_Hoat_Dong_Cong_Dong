import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import InputSelect from '../components/Input/InputSelect'
import Button from '../components/Button'
import Table from '../components/Table'
import Title from '../components/Title'
import ItemRowTableTuDanhGia from '../components/ItemRow/ItemRowTableTuDanhGia'
import ItemRowNoData from '../components/ItemRow/ItemRowNoData'
import ItemRowTableTuDanhGiaAdd from '../components/ItemRow/ItemRowTableTuDanhGiaAdd'

import {
  COMMUNITY_ACTIVITY_APPROVAL_PERIOD,
  COMMUNITY_ACTIVITY_APPROVAL_PERIOD_STATUS,
  ROLES,
  callApiGetClassById,
  callApiGetSettings,
  callApiGetUserByUserId,
  callApiGetUserCommunityActivities,
  checkAndHandleLogin,
  checkIsCurrentYear,
  checkPermissionToAccessThePage,
  checkRoles2,
  generateAcademyYearOptions,
  generateYearOptions,
  getUserId,
  getUserRole,
  handleError,
} from '../utils'

export default function TuDanhGia() {
  const role = useSelector(state => state.role)
  const academyYearOptions = generateAcademyYearOptions()

  const [setting, setSetting] = useState({})
  const [isShowAddNew, setShowAddNew] = useState(false)
  const [communityActivities, setCommunityActivities] = useState([])
  const [academicYearOptions, setAcademicYearOption] = useState([])
  const [selectedAcademyYear, setSelectedAcademyYear] = useState(academyYearOptions[0])
  const navigate = useNavigate()

  useEffect(() => {
    checkAndHandleLogin(navigate)
    checkPermissionToAccessThePage(getUserRole(), [ROLES.SINH_VIEN, ROLES.LOP_TRUONG], navigate)
    fetchCommunityActivities()
    fetchInfoUser()
    fetchSettings(COMMUNITY_ACTIVITY_APPROVAL_PERIOD)
  }, [])

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
    const userId = getUserId()
    if (userId) {
      try {
        const data = await callApiGetUserCommunityActivities(userId, selectedAcademyYear.value)
        // console.log(data)
        setCommunityActivities(data)
      } catch (error) {
        console.error(error)
        handleError(error, navigate)
      }
    }
  }

  const fetchInfoUser = async () => {
    const userId = getUserId()
    if (userId) {
      try {
        const data = await callApiGetUserByUserId(userId)
        // console.log('classId', data)
        fetchInfoClass(data.classId)
      } catch (error) {
        console.error(error)
        handleError(error, navigate)
      }
    }
  }

  const fetchInfoClass = async classId => {
    if (classId) {
      try {
        const data = await callApiGetClassById(classId)
        const option = generateYearOptions(data.academicYear)
        setAcademicYearOption(option)
      } catch (error) {
        console.error(error)
        handleError(error, navigate)
      }
    }
  }

  const genHeaderByRole = () => {
    const header = [
      { className: 'w-5%', title: 'stt' },
      { className: 'w-25%', title: 'loại hoạt động' },
      { className: 'w-25%', title: 'tên hoạt động' },
      { className: 'w-5%', title: 'khung điểm' },
      { className: 'w-5%', title: 'điểm tự đánh giá' },
      { className: 'w-5%', title: 'điểm ban cán sự đánh giá' },
      { className: '', title: 'link minh chứng' },
    ]
    // if (checkRoles2([ROLES.GIAO_VIEN, ROLES.TRUONG_KHOA], [role])) {
    //   return [...header, { className: 'w-5%', title: 'xác nhận' }]
    // }
    return [...header, { className: 'w-10%', title: 'trạng thái' }, { className: 'w-5%', title: '' }]
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
        <ItemRowTableTuDanhGiaAdd key={-2} setShowAddNew={setShowAddNew} refresh={fetchCommunityActivities} />,
      ])
    return arrJsx
  }

  return (
    <div className='container mx-auto'>
      <Title title='tự đánh giá' />
      <div className='mt-3'>
        <div className='flex items-center gap-2 '>
          <span className='font-bold text-primary text-main'>Năm đánh giá:</span>
          <div className='w-48'>
            <InputSelect options={academicYearOptions} value={selectedAcademyYear} onChange={setSelectedAcademyYear} />
          </div>
        </div>
      </div>
      <div className='py-3'>
        <div className='flex justify-between items-center'>
          <h3 className='uppercase font-bold'>nội dung tự đánh giá</h3>
          <div>
            {checkIsCurrentYear(selectedAcademyYear.value) && (
              <>
                {setting.status === COMMUNITY_ACTIVITY_APPROVAL_PERIOD_STATUS.STUDENT ? (
                  <>
                    {!checkRoles2([ROLES.GIAO_VIEN, ROLES.TRUONG_KHOA], [role]) && !isShowAddNew && (
                      <Button label='thêm' type='add' onClick={() => setShowAddNew(true)} />
                    )}
                  </>
                ) : (
                  <span className='font-bold text-main text-red-text my-2'>
                    ** Bạn chưa được phép đánh giá học kỳ này **
                  </span>
                )}
              </>
            )}
          </div>
        </div>
        <div className='my-2'>
          <Table header={genHeaderByRole()}>{renderBodyTable()}</Table>
        </div>
        {/* {!checkRoles2([ROLES.GIAO_VIEN, ROLES.TRUONG_KHOA], [role]) &&
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
