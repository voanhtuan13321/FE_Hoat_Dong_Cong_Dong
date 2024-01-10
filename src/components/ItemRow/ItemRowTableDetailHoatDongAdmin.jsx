import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  COMMUNITY_ACTIVITY_STATUS,
  REGEX,
  callApiGetCommunityActivityTypesList,
  handleError,
} from '../../utils'

export default function ItemRowTableDetailHoatDongAdmin({ index, data }) {
  const [rowData, setRowData] = useState(data)
  const [selectedCommunityActivityTypes, setSelectedCommunityActivityTypes] =
    useState({})
  const navigate = useNavigate()

  // console.log(data)

  useEffect(() => {
    fetchCommunityActivityTypes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setRowData(data)
  }, [data])

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

  const genStatus = () => {
    switch (rowData.status) {
      case COMMUNITY_ACTIVITY_STATUS.REJECTED:
        return <span className='text-red-500'>Bị từ chối</span>
      case COMMUNITY_ACTIVITY_STATUS.STUDENT_CONFIRMED:
        return <span className=''>Chưa phê duyệt</span>
      case COMMUNITY_ACTIVITY_STATUS.CLASS_PRESIDENT_CONFIRMED:
        return <span className=''>Lớp trưởng phê duyệt</span>
      case COMMUNITY_ACTIVITY_STATUS.HEAD_TEACHER_CONFIRMED:
        return <span className=''>Chủ nhiệm phê duyệt</span>
      case COMMUNITY_ACTIVITY_STATUS.MAJOR_HEAD_CONFIRMED:
        return <span className='text-green-600'>Trưởng khoa phê duyệt</span>
      default:
        return <></>
    }
  }

  return (
    <tr className='text-main'>
      <td className='border border-primary p-1 text-center'>{index + 1}</td>
      <td className='border border-primary p-1 truncate'>
        {rowData.activityTypeName}
      </td>
      <td className='border border-primary p-1 truncate'>{rowData.name}</td>
      <td className='border border-primary p-1 text-center'>
        {`${selectedCommunityActivityTypes?.minScore || ''} - ${
          selectedCommunityActivityTypes?.maxScore || ''
        }`}
      </td>
      <td className='border border-primary p-1 text-center'>
        {rowData.selfEvaluationScore}
      </td>
      <td className='border border-primary p-1 text-center'>
        {rowData.classPresidentEvaluationScore}
      </td>
      <td className='border border-primary p-1 truncate'>
        {REGEX.LINK.test(rowData.evidentLink) ? (
          <a
            className='text-blue-500 truncate'
            target='_blank'
            href={rowData.evidentLink}
          >
            {rowData.evidentLink}
          </a>
        ) : (
          rowData.evidentLink
        )}
      </td>
      <td className='border border-primary text-center p-1 truncate'>
        {genStatus()}
      </td>
    </tr>
  )
}
