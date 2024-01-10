import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import InputCheckbox from '../Input/InputCheckbox'
import Button from '../Button'
import InputNumber from '../Input/InputNumber'

import {
  COMMUNITY_ACTIVITY_APPROVAL_PERIOD,
  COMMUNITY_ACTIVITY_APPROVAL_PERIOD_STATUS,
  COMMUNITY_ACTIVITY_STATUS,
  REGEX,
  ROLES,
  callApiGetCommunityActivityTypesList,
  callApiGetSettings,
  callApiUpdateCommunityActivity,
  checkRoles2,
  handleError,
} from '../../utils'
import Swal from 'sweetalert2'

export default function ItemRowTableDetailHoatDong({ index, data, refresh, refreshStudent, academyYear }) {
  const role = useSelector(state => state.role)

  const [setting, setSetting] = useState({})
  const [isShowEdit, setShowEdit] = useState(false)
  const [rowData, setRowData] = useState(data)
  const [selectedCommunityActivityTypes, setSelectedCommunityActivityTypes] = useState({})
  const navigate = useNavigate()

  // console.log(data)

  useEffect(() => {
    fetchCommunityActivityTypes()
    fetchSettings(COMMUNITY_ACTIVITY_APPROVAL_PERIOD)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setRowData(data)
  }, [data])

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

  const fetchCommunityActivityTypes = async () => {
    try {
      const data = await callApiGetCommunityActivityTypesList()
      // console.log(data)
      const result = data.map(item => ({ ...item, value: item.id }))
      const select = result.find(item => item.id === rowData.activityTypeId)
      setSelectedCommunityActivityTypes(select)
    } catch (error) {
      console.error(error)
      handleError(error, navigate)
    }
  }

  const onClickCancel = () => {
    setRowData(data)
    setShowEdit(false)
  }

  const onClickConfirm = async status => {
    try {
      const dataRequest = { ...rowData, status: status }
      const data = await callApiUpdateCommunityActivity(dataRequest)
      setRowData(data)
      refresh()
      refreshStudent()
      toast.success('cập nhật thành công')
      setShowEdit(false)
    } catch (error) {
      console.error(error)
      handleError(error, navigate)
    }
  }

  const handleSave = async () => {
    if (
      rowData.classPresidentEvaluationScore !== 0 &&
      (rowData.classPresidentEvaluationScore < selectedCommunityActivityTypes?.minScore ||
        rowData.classPresidentEvaluationScore > selectedCommunityActivityTypes?.maxScore)
    ) {
      Swal.fire('Điểm không hợp lệ', '', 'error')
      return
    }

    const newStatus =
      rowData.classPresidentEvaluationScore === 0
        ? COMMUNITY_ACTIVITY_STATUS.REJECTED
        : COMMUNITY_ACTIVITY_STATUS.CLASS_PRESIDENT_CONFIRMED
    onClickConfirm(newStatus)
  }

  return (
    <tr className='text-main'>
      <td className='border border-primary p-1 text-center'>{index + 1}</td>
      <td className='border border-primary p-1 truncate'>{rowData.activityTypeName}</td>
      <td className='border border-primary p-1 truncate'>{rowData.name}</td>
      <td className='border border-primary p-1 text-center'>
        {`${selectedCommunityActivityTypes?.minScore || ''} - ${selectedCommunityActivityTypes?.maxScore || ''}`}
      </td>
      <td className='border border-primary p-1 text-center'>{rowData.selfEvaluationScore}</td>
      <td className='border border-primary text-center'>
        {isShowEdit ? (
          <div className='w-[80px]'>
            <InputNumber
              name='classPresidentEvaluationScore'
              value={rowData.classPresidentEvaluationScore}
              onChange={e =>
                setRowData({
                  ...rowData,
                  classPresidentEvaluationScore: Number(e.target.value),
                })
              }
            />
          </div>
        ) : (
          rowData.classPresidentEvaluationScore
        )}
      </td>
      <td className='border border-primary p-1 truncate'>
        {REGEX.LINK.test(rowData.evidentLink) ? (
          <a className='text-blue-500 truncate' target='_blank' href={rowData.evidentLink}>
            {rowData.evidentLink}
          </a>
        ) : (
          rowData.evidentLink
        )}
      </td>
      {checkRoles2([ROLES.LOP_TRUONG], [role]) && (
        <td className='border border-primary px-1 flex justify-center gap-1'>
          {isShowEdit ? (
            <>
              <Button label='lưu' onClick={handleSave} />
              <Button label='huỷ' type='outline' onClick={onClickCancel} />
            </>
          ) : (
            <Button
              disable={
                rowData.status >= COMMUNITY_ACTIVITY_STATUS.HEAD_TEACHER_CONFIRMED ||
                setting.status !== COMMUNITY_ACTIVITY_APPROVAL_PERIOD_STATUS.CLASS_PRESIDENT
              }
              label={`${rowData.status === COMMUNITY_ACTIVITY_STATUS.CLASS_PRESIDENT_CONFIRMED ? 'sửa' : 'đánh giá'}`}
              type='edit'
              onClick={() => setShowEdit(true)}
            />
          )}
        </td>
      )}
      {checkRoles2([ROLES.GIAO_VIEN, ROLES.TRUONG_KHOA], [role]) && (
        <>
          <td className='border border-primary px-1 text-center'>
            {rowData.status !== COMMUNITY_ACTIVITY_STATUS.STUDENT_CONFIRMED && (
              <InputCheckbox
                disabled={
                  academyYear !== new Date().getFullYear() ||
                  rowData.status >= COMMUNITY_ACTIVITY_STATUS.MAJOR_HEAD_CONFIRMED ||
                  setting.status !== COMMUNITY_ACTIVITY_APPROVAL_PERIOD_STATUS.HEAD_TEACHER
                }
                value={rowData.status >= COMMUNITY_ACTIVITY_STATUS.HEAD_TEACHER_CONFIRMED}
                onClick={() => onClickConfirm(COMMUNITY_ACTIVITY_STATUS.HEAD_TEACHER_CONFIRMED)}
              />
            )}
          </td>
          <td className='border border-primary px-1 text-center'>
            <InputCheckbox
              disabled={
                academyYear !== new Date().getFullYear() ||
                setting.status !== COMMUNITY_ACTIVITY_APPROVAL_PERIOD_STATUS.HEAD_TEACHER
              }
              value={rowData.status === COMMUNITY_ACTIVITY_STATUS.REJECTED}
              onClick={() => onClickConfirm(COMMUNITY_ACTIVITY_STATUS.REJECTED)}
            />
          </td>
        </>
      )}
    </tr>
  )
}
