import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import toast from 'react-hot-toast'

import InputSelect from '../Input/InputSelect'
import InputNumber from '../Input/InputNumber'
import InputText from '../Input/InputText'
import InputCheckbox from '../Input/InputCheckbox'
import Button from '../Button'

import {
  COMMUNITY_ACTIVITY_APPROVAL_PERIOD,
  COMMUNITY_ACTIVITY_APPROVAL_PERIOD_STATUS,
  COMMUNITY_ACTIVITY_STATUS,
  COMMUNITY_ACTIVITY_STATUS_MESSAGE,
  ROLES,
  callApiDeleteCommunityActivity,
  callApiGetCommunityActivityTypesList,
  callApiGetSettings,
  callApiUpdateCommunityActivity,
  checkIsCurrentYear,
  checkRoles2,
  handleError,
} from '../../utils'

export default function ItemRowTableTuDanhGia({ index, data, refresh, academyYear }) {
  const role = useSelector(state => state.role)

  const [setting, setSetting] = useState({})
  const [isEdit, setShowEdit] = useState(false)
  const [rowData, setRowData] = useState(data)
  const [optionCommunityActivityTypes, setOptionCommunityActivityTypes] = useState([])
  const [selectedCommunityActivityTypes, setSelectedCommunityActivityTypes] = useState({})
  const navigate = useNavigate()

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
      setOptionCommunityActivityTypes(result)
      const select = result.find(item => item.id === rowData.activityTypeId)
      setSelectedCommunityActivityTypes(select)
    } catch (error) {
      console.error(error)
      handleError(error, navigate)
    }
  }

  const onChangeValue = event => {
    const { name, value } = event.target
    let newValue = Number(value)
    setRowData({ ...rowData, [name]: newValue || value })
  }

  const onClickCancel = () => {
    setRowData(data)
    setShowEdit(false)
  }

  const handleSave = async () => {
    try {
      const data = await callApiUpdateCommunityActivity(rowData)
      setRowData(data)
      setShowEdit(false)
    } catch (error) {
      console.error(error)
      handleError(error, navigate)
    }
  }

  const genStatus = () => {
    switch (rowData.status) {
      case COMMUNITY_ACTIVITY_STATUS.REJECTED:
        return <span className='text-red-500'>{COMMUNITY_ACTIVITY_STATUS_MESSAGE.REJECTED}</span>
      case COMMUNITY_ACTIVITY_STATUS.STUDENT_CONFIRMED:
        return <span className=''>{COMMUNITY_ACTIVITY_STATUS_MESSAGE.STUDENT_CONFIRMED}</span>
      case COMMUNITY_ACTIVITY_STATUS.CLASS_PRESIDENT_CONFIRMED:
        return <span className=''>{COMMUNITY_ACTIVITY_STATUS_MESSAGE.CLASS_PRESIDENT_CONFIRMED}</span>
      case COMMUNITY_ACTIVITY_STATUS.HEAD_TEACHER_CONFIRMED:
        return <span className=''>{COMMUNITY_ACTIVITY_STATUS_MESSAGE.HEAD_TEACHER_CONFIRMED}</span>
      case COMMUNITY_ACTIVITY_STATUS.MAJOR_HEAD_CONFIRMED:
        return <span className='text-green-600'>{COMMUNITY_ACTIVITY_STATUS_MESSAGE.MAJOR_HEAD_CONFIRMED}</span>
      default:
        return <></>
    }
  }

  const handleDelete = async () => {
    const { isDenied } = await Swal.fire({
      title: 'Bạn có chắc muốn xoá không?',
      showDenyButton: true,
      denyButtonText: 'Xoá',
      showCancelButton: true,
      cancelButtonText: 'Huỷ',
      showConfirmButton: false,
    })
    if (isDenied) {
      try {
        const data = await callApiDeleteCommunityActivity(rowData.id)
        toast.success('Xoá thành công')
        refresh()
      } catch (error) {
        console.error(error)
        handleError(error, navigate)
      }
    }
  }

  return (
    <>
      {isEdit ? (
        <tr className='text-main'>
          <td className='border border-primary text-center'>{index + 1}</td>
          <td className='border border-primary'>
            <InputSelect
              options={optionCommunityActivityTypes}
              value={selectedCommunityActivityTypes}
              onChange={setSelectedCommunityActivityTypes}
            />
          </td>
          <td>
            <InputText name='name' value={rowData.name} onChange={onChangeValue} />
          </td>
          <td className='border border-primary text-center'>
            {`${selectedCommunityActivityTypes.minScore || ''} - ${selectedCommunityActivityTypes.maxScore || ''}`}
          </td>
          <td className='border border-primary'>
            <InputNumber
              name='selfEvaluationScore'
              value={rowData.selfEvaluationScore}
              min={selectedCommunityActivityTypes.minScore}
              max={selectedCommunityActivityTypes.maxScore}
              onChange={onChangeValue}
            />
          </td>
          <td className='border border-primary text-center'>{rowData.classPresidentEvaluationScore}</td>
          <td className='border border-primary'>
            <InputText name='evidentLink' value={rowData.evidentLink} onChange={onChangeValue} />
          </td>
          {!checkRoles2([ROLES.GIAO_VIEN, ROLES.TRUONG_KHOA], [role]) && (
            <td className='border border-primary text-center flex gap-1 justify-center'>
              <Button type='' label='lưu' onClick={handleSave} />
              <Button type='outline' label='huỷ' onClick={onClickCancel} />
            </td>
          )}
          {checkRoles2([ROLES.GIAO_VIEN, ROLES.TRUONG_KHOA], [role]) && (
            <td className='border border-primary p-1 text-center'>
              <InputCheckbox />
            </td>
          )}
        </tr>
      ) : (
        <tr className='text-main'>
          <td className='border border-primary p-1 text-center'>{index + 1}</td>
          <td className='border border-primary p-1 truncate'>{rowData.activityTypeName}</td>
          <td className='border border-primary p-1 truncate'>{rowData.name}</td>
          <td className='border border-primary p-1 text-center'>
            {`${selectedCommunityActivityTypes.minScore} - ${selectedCommunityActivityTypes.maxScore}`}
          </td>
          <td className='border border-primary p-1 text-center'>{rowData.selfEvaluationScore}</td>
          <td className='border border-primary p- text-center'>{rowData.classPresidentEvaluationScore}</td>
          <td className='border border-primary p-1 truncate'>{rowData.evidentLink}</td>
          <td className='border border-primary px-1 text-center'>{genStatus()}</td>
          {!checkRoles2([ROLES.GIAO_VIEN, ROLES.TRUONG_KHOA], [role]) && (
            <td className='border border-primary px-1 text-center flex gap-1'>
              <Button
                disable={
                  !checkIsCurrentYear(academyYear) ||
                  setting.status !== COMMUNITY_ACTIVITY_APPROVAL_PERIOD_STATUS.STUDENT ||
                  rowData.status !== COMMUNITY_ACTIVITY_STATUS.STUDENT_CONFIRMED
                }
                type='edit'
                label='sửa'
                onClick={() => setShowEdit(true)}
              />
              <Button
                disable={
                  !checkIsCurrentYear(academyYear) ||
                  setting.status !== COMMUNITY_ACTIVITY_APPROVAL_PERIOD_STATUS.STUDENT ||
                  rowData.status !== COMMUNITY_ACTIVITY_STATUS.STUDENT_CONFIRMED
                }
                type='delete'
                label='xoá'
                onClick={handleDelete}
              />
            </td>
          )}
        </tr>
      )}
    </>
  )
}
