import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import InputCheckbox from '../Input/InputCheckbox'
import Button from '../Button'
import InputNumber from '../Input/InputNumber'

import {
  COMMUNITY_ACTIVITY_STATUS,
  ROLES,
  callApiGetCommunityActivityTypesList,
  callApiUpdateCommunityActivity,
  checkRoles2,
  handleError,
} from '../../utils'

export default function ItemRowTableDetailHoatDong({ index, data, refresh }) {
  const role = useSelector(state => state.role)

  console.log(data)

  const [isShowEdit, setShowEdit] = useState(false)
  const [rowData, setRowData] = useState(data)
  const [selectedCommunityActivityTypes, setSelectedCommunityActivityTypes] =
    useState({})
  const navigate = useNavigate()

  useEffect(() => {
    fetchCommunityActivityTypies()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setRowData(data)
  }, [data])

  const fetchCommunityActivityTypies = async () => {
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

  const onClickSave = async () => {
    const dataRequest = {
      ...rowData,
      status: COMMUNITY_ACTIVITY_STATUS.classPresidentConfirmed,
    }
    try {
      const data = await callApiUpdateCommunityActivity(dataRequest)
      setRowData(data)
      refresh()
      toast.success('cập nhật thành công')
      setShowEdit(false)
    } catch (error) {
      console.error(error)
      handleError(error, navigate)
    }
  }

  return (
    <tr className='text-main'>
      <td className='border border-primary p-1 text-center'>{index + 1}</td>
      <td className='border border-primary p-1'>{rowData.activityTypeName}</td>
      <td className='border border-primary p-1'>{rowData.name}</td>
      <td className='border border-primary p-1 text-center'>
        {`${selectedCommunityActivityTypes?.minScore || ''} - ${
          selectedCommunityActivityTypes?.maxScore || ''
        }`}
      </td>
      <td className='border border-primary p-1 text-center'>
        {rowData.selfEvaluationScore}
      </td>
      <td className='border border-primary p-1 text-center'>
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
      <td className='border border-primary p-1'>{rowData.evidentLink}</td>
      <td className='border border-primary p-1 flex justify-center gap-1'>
        {isShowEdit ? (
          <>
            <Button label='lưu' onClick={onClickSave} />
            <Button label='huỷ' type='outline' onClick={onClickCancel} />
          </>
        ) : (
          <Button
            label={`${
              rowData.status ===
              COMMUNITY_ACTIVITY_STATUS.classPresidentConfirmed
                ? 'sửa'
                : 'đánh giá'
            }`}
            type='edit'
            onClick={() => setShowEdit(true)}
          />
        )}
      </td>
      {checkRoles2([ROLES.giaoVien, ROLES.truongKhoa], [role]) && (
        <td className='border border-primary px-1 text-center'>
          <InputCheckbox />
        </td>
      )}
    </tr>
  )
}
