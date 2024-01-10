import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import toast from 'react-hot-toast'

import InputSelect from '../Input/InputSelect'
import InputNumber from '../Input/InputNumber'
import InputText from '../Input/InputText'
import Button from '../Button'

import {
  COMMUNITY_ACTIVITY_STATUS,
  callApiCreateCommunityActivity,
  callApiGetCommunityActivityTypesList,
  getUserId,
  handleError,
} from '../../utils'

const initialValues = {
  userId: '', // chua co
  activityTypeId: '', // chua co
  name: '',
  year: new Date().getFullYear(),
  selfEvaluationScore: 0,
  classPresidentEvaluationScore: 0,
  evidentLink: '',
  status: 0,
  studentNote: '',
  adminNote: '',
}

export default function ItemRowTableDetailHoatDongAdminAdd({
  userId,
  setShowAddNew,
  refresh,
}) {
  const [optionCommunityActivityTypes, setOptionCommunityActivityTypes] =
    useState([])
  const [selectedCommunityActivityTypes, setSelectedCommunityActivityTypes] =
    useState({})
  const [dataSubmit, setDataSubmit] = useState(initialValues)
  const navigate = useNavigate()

  useEffect(() => {
    fetchCommunityActivityTypies()
  }, [])

  const fetchCommunityActivityTypies = async () => {
    try {
      const data = await callApiGetCommunityActivityTypesList()
      console.log(data)
      const result = data.map(item => ({
        ...item,
        value: item.id,
      }))
      setOptionCommunityActivityTypes(result)
      setSelectedCommunityActivityTypes(result[0])
    } catch (error) {
      console.error(error)
      handleError(error, navigate)
    }
  }

  const onChangeInput = event => {
    const { name, value } = event.target
    setDataSubmit({ ...dataSubmit, [name]: value })
  }

  const handleSave = async () => {
    if (userId) {
      const dataRequest = {
        ...dataSubmit,
        userId,
        activityTypeId: selectedCommunityActivityTypes.value,
        status: COMMUNITY_ACTIVITY_STATUS.MAJOR_HEAD_CONFIRMED,
        selfEvaluationScore: dataSubmit.classPresidentEvaluationScore,
      }

      if (
        dataRequest.classPresidentEvaluationScore <
          selectedCommunityActivityTypes.minScore ||
        dataRequest.classPresidentEvaluationScore >
          selectedCommunityActivityTypes.maxScore
      ) {
        Swal.fire(
          `Bạn phải nhập điểm trong khoản ${selectedCommunityActivityTypes.minScore} đến ${selectedCommunityActivityTypes.maxScore}`,
          '',
          'error',
        )
        return
      }

      try {
        const data = await callApiCreateCommunityActivity(dataRequest)
        // console.log(data)
        setShowAddNew(false)
        toast.success('Thêm thành công')
        refresh()
      } catch (error) {
        console.error(error)
        handleError(error, navigate)
      }
    }
  }

  const handleCancel = () => {
    setDataSubmit(initialValues)
    setShowAddNew(false)
  }

  return (
    <tr className='text-main'>
      <td className='border border-primary p-1 text-center'></td>
      <td className='border border-primary'>
        <InputSelect
          options={optionCommunityActivityTypes}
          value={selectedCommunityActivityTypes}
          onChange={setSelectedCommunityActivityTypes}
        />
      </td>
      <td className='border border-primary'>
        <InputText
          name='name'
          value={dataSubmit.name}
          onChange={onChangeInput}
        />
      </td>
      <td className='border border-primary text-center'>{`${selectedCommunityActivityTypes.minScore} - ${selectedCommunityActivityTypes.maxScore}`}</td>
      <td className='border border-primary text-center'>
        {dataSubmit.classPresidentEvaluationScore}
      </td>
      <td className='border border-primary text-center'>
        <InputNumber
          name='classPresidentEvaluationScore'
          value={dataSubmit.classPresidentEvaluationScore}
          min={selectedCommunityActivityTypes.minScore}
          max={selectedCommunityActivityTypes.maxScore}
          onChange={e =>
            setDataSubmit({
              ...dataSubmit,
              classPresidentEvaluationScore: Number(e.target.value),
            })
          }
        />
      </td>
      <td className='border border-primary'>
        <InputText
          name='evidentLink'
          value={dataSubmit.evidentLink}
          onChange={onChangeInput}
        />
      </td>
      <td className='border border-primary px-1 text-center flex gap-1 justify-center'>
        <Button type='' label='lưu' onClick={handleSave} />
        <Button type='outline' label='huỷ' onClick={handleCancel} />
      </td>
    </tr>
  )
}
