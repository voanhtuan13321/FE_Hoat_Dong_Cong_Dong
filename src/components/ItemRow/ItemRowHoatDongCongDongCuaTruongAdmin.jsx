import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { callApiGetClassById, handleError } from '../../utils'

export default function ItemRowHoatDongCongDongCuaTruongAdmin({ index, dt }) {
  const [className, setClassName] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    fetchClassName(dt.classId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dt])

  const fetchClassName = async classId => {
    try {
      const { name } = await callApiGetClassById(classId)
      setClassName(name)
    } catch (error) {
      console.error(error)
      handleError(error, navigate)
    }
  }
  return (
    <tr>
      <td className='border border-primary p-1 text-center text-main'>
        {index + 1}
      </td>
      <td className='border border-primary p-1 text-center text-main'>
        {dt.studentId}
      </td>
      <td className='border border-primary p-1  text-main'>{`${dt.firstName} ${dt.lastName}`}</td>
      <td className='border border-primary p-1 text-center text-main'>
        {className}
      </td>
      <td className='border border-primary p-1 text-center text-main'>
        {dt.sumScoreMajorHeadConfirmed}
      </td>
    </tr>
  )
}
