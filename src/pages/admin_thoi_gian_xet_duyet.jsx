import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import InputToggle from '../components/Input/InputToggle'

import {
  COMMUNITY_ACTIVITY_APPROVAL_PERIOD,
  COMMUNITY_ACTIVITY_APPROVAL_PERIOD_STATUS,
  ROLES,
  callApiGetSettings,
  callApiUpdateSettingStatus,
  checkAndHandleLogin,
  checkPermissionToAccessThePage,
  getUserRole,
  handleError,
} from '../utils'
import Title from '../components/Title'

export default function AdminThoiGianXetDuyet() {
  const [setting, setSetting] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    checkAndHandleLogin(navigate)
    checkPermissionToAccessThePage(getUserRole(), [ROLES.ADMIN], navigate)
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

  const handleChangeStatus = async status => {
    try {
      const newStatus =
        status === setting.status
          ? COMMUNITY_ACTIVITY_APPROVAL_PERIOD_STATUS.RESTRICTED
          : status

      // console.log('new status: ', newStatus)
      const data = await callApiUpdateSettingStatus(
        COMMUNITY_ACTIVITY_APPROVAL_PERIOD,
        newStatus,
      )
      setSetting(data)
    } catch (error) {
      console.error(error)
      handleError(error, navigate)
    }
  }

  const genProperties = status => ({
    enabled: setting?.status === status,
    setEnabled: () => handleChangeStatus(status),
  })

  return (
    <div className='container mx-auto py-2'>
      <Title title='Cập nhật thời gian xét duyệt' />
      <div className='w-[400px] mx-auto mt-5 flex flex-col gap-3'>
        <div className='flex justify-between border-b py-4'>
          <span>Cho phép sinh viên tạo mới hoạt động cộng đồng</span>
          <InputToggle
            {...genProperties(
              COMMUNITY_ACTIVITY_APPROVAL_PERIOD_STATUS.STUDENT,
            )}
          />
        </div>
        <div className='flex justify-between border-b py-4'>
          <span>Cho phép lớp trưởng xét duyệt</span>
          <InputToggle
            {...genProperties(
              COMMUNITY_ACTIVITY_APPROVAL_PERIOD_STATUS.CLASS_PRESIDENT,
            )}
          />
        </div>
        <div className='flex justify-between border-b py-4'>
          <span>Cho phép giáo viên xét duyệt</span>
          <InputToggle
            {...genProperties(
              COMMUNITY_ACTIVITY_APPROVAL_PERIOD_STATUS.HEAD_TEACHER,
            )}
          />
        </div>
        <div className='flex justify-between border-b py-4'>
          <span>Cho phép trưởng khoa xét duyệt</span>
          <InputToggle
            {...genProperties(
              COMMUNITY_ACTIVITY_APPROVAL_PERIOD_STATUS.MAJOR_HEAD,
            )}
          />
        </div>
      </div>
    </div>
  )
}
