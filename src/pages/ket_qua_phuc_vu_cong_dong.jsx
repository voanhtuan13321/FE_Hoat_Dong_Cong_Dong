import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Title from '../components/Title'
import Table from '../components/Table'
import ItemRowNoData from '../components/ItemRow/ItemRowNoData'

import {
  COMMUNITY_ACTIVITY_STATUS,
  ROLES,
  callApiGetUserCommunityActivitiesNoneYear,
  checkAndHandleLogin,
  checkPermissionToAccessThePage,
  getUserId,
  getUserRole,
  handleError,
} from '../utils'

const HEADER_TABLE = [
  { className: 'w-5%', title: 'stt' },
  { className: 'w-15%', title: 'Năm' },
  { className: '', title: 'Tên hoạt động' },
  { className: 'w-10%', title: 'Điểm' },
  { className: 'w-20%', title: 'Ghi chú' },
]

export default function KetQuaPhucVuCongDong() {
  const [data, setData] = useState([])
  const [totalScore, setTotalScore] = useState()
  const navigate = useNavigate()

  useEffect(() => {
    checkAndHandleLogin(navigate)
    checkPermissionToAccessThePage(
      getUserRole(),
      [ROLES.SINH_VIEN, ROLES.LOP_TRUONG],
      navigate,
    )
    fetchCommunityActivities()
  }, [])

  const fetchCommunityActivities = async () => {
    const userId = getUserId()

    if (userId) {
      try {
        const data = await callApiGetUserCommunityActivitiesNoneYear(userId)
        console.log(data)
        const showData = data.filter(
          item =>
            item.status === COMMUNITY_ACTIVITY_STATUS.MAJOR_HEAD_CONFIRMED,
        )
        const score = showData.reduce(
          (acc, item) => acc + item.classPresidentEvaluationScore,
          0,
        )
        setTotalScore(score)
        setData(showData)
      } catch (error) {
        console.error(error)
        handleError(error, navigate)
      }
    }
  }

  const renderBodyTable = () => {
    return data?.length === 0
      ? [<ItemRowNoData key={-1} colSpan={15} />]
      : data?.map((dt, index) => (
          <tr key={index}>
            <td className='border border-primary p-1 text-center text-main'>
              {++index}
            </td>
            <td className='border border-primary p-1 text-center  text-main'>
              {dt.year}
            </td>
            <td className='border border-primary p-1 text-center  text-main'>
              {dt.name}
            </td>
            <td className='border border-primary p-1 text-center  text-main'>
              {dt.classPresidentEvaluationScore}
            </td>
            <td className='border border-primary p-1  text-main'></td>
          </tr>
        ))
  }

  return (
    <>
      <div className='container justify-center m-auto p-2'>
        <Title title={'Kết quả phục vụ cộng đồng'}></Title>
        <p className='font-semibold text-primary py-3'>
          Tổng điểm HĐCĐ của cả khóa học:{' '}
          <span className='text-red-text'>{totalScore}</span>
        </p>
        <div className='my-2'>
          <Table header={HEADER_TABLE}>{renderBodyTable()}</Table>
        </div>
      </div>
    </>
  )
}
