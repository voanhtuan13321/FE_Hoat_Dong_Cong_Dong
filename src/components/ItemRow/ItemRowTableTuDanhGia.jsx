import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import InputSelect from '../Input/InputSelect'
import InputNumber from '../Input/InputNumber'
import InputText from '../Input/InputText'
import InputCheckbox from '../Input/InputCheckbox'
import Button from '../Button'

import {
  COMMUNITY_ACTIVITY_STATUS,
  ROLES,
  callApiDeleteCommunityActivity,
  callApiGetCommunityActivityTypesList,
  callApiUpdateCommunityActivity,
  checkIsCurrentYear,
  checkRoles2,
  handleError,
} from '../../utils'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import toast from 'react-hot-toast'

export default function ItemRowTableTuDanhGia({
  index,
  data,
  refresh,
  academyYear,
}) {
  const role = useSelector(state => state.role)

  const [isEdit, setShowEdit] = useState(false)
  const [rowData, setRowData] = useState(data)
  const [optionCommunityActivityTypes, setOptionCommunityActivityTypes] =
    useState([])
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
            <InputText
              name='name'
              value={rowData.name}
              onChange={onChangeValue}
            />
          </td>
          <td className='border border-primary text-center'>
            {`${selectedCommunityActivityTypes.minScore || ''} - ${
              selectedCommunityActivityTypes.maxScore || ''
            }`}
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
          <td className='border border-primary text-center'>
            {rowData.classPresidentEvaluationScore}
          </td>
          <td className='border border-primary'>
            <InputText
              name='evidentLink'
              value={rowData.evidentLink}
              onChange={onChangeValue}
            />
          </td>
          {!checkRoles2([ROLES.giaoVien, ROLES.truongKhoa], [role]) && (
            <td className='border border-primary text-center flex gap-1 justify-center'>
              <Button type='' label='lưu' onClick={handleSave} />
              <Button type='outline' label='huỷ' onClick={onClickCancel} />
            </td>
          )}
          {checkRoles2([ROLES.giaoVien, ROLES.truongKhoa], [role]) && (
            <td className='border border-primary p-1 text-center'>
              <InputCheckbox />
            </td>
          )}
        </tr>
      ) : (
        <tr className='text-main'>
          <td className='border border-primary p-1 text-center'>{index + 1}</td>
          <td className='border border-primary p-1'>
            {rowData.activityTypeName}
          </td>
          <td className='border border-primary p-1'>{rowData.name}</td>
          <td className='border border-primary p-1 text-center'>
            {`${selectedCommunityActivityTypes.minScore} - ${selectedCommunityActivityTypes.maxScore}`}
          </td>
          <td className='border border-primary p-1 text-center'>
            {rowData.selfEvaluationScore}
          </td>
          <td className='border border-primary p- text-center'>
            {rowData.classPresidentEvaluationScore}
          </td>
          <td className='border border-primary p-1'>{rowData.evidentLink}</td>
          {!checkRoles2([ROLES.giaoVien, ROLES.truongKhoa], [role]) && (
            <td className='border border-primary px-1 text-center flex gap-1'>
              {checkIsCurrentYear(academyYear) &&
              rowData.status === COMMUNITY_ACTIVITY_STATUS.studentConfirmed ? (
                <>
                  <Button
                    type='edit'
                    label='sửa'
                    onClick={() => setShowEdit(true)}
                  />
                  <Button type='delete' label='xoá' onClick={handleDelete} />
                </>
              ) : (
                <span className='p-2 text-white'>fasdf</span>
              )}
            </td>
          )}
          {checkRoles2([ROLES.giaoVien, ROLES.truongKhoa], [role]) && (
            <td className='border border-primary px-1 text-center'>
              <InputCheckbox />
            </td>
          )}
        </tr>
      )}
    </>
  )
}
