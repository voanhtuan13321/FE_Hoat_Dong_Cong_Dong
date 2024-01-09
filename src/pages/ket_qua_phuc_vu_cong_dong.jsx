import React, { useEffect, useState } from 'react'
import Title from '../components/Title'
import Table from '../components/Table'
import {
  COMMUNITY_ACTIVITY_STATUS,
  callApiGetUserCommunityActivitiesNoneYear,
  getUserId,
  handleError,
} from '../utils'
import { useNavigate } from 'react-router-dom'
import ItemRowNoData from '../components/ItemRow/ItemRowNoData'

const dataTable = {
  header: [
    { className: 'w-5%', title: 'stt' },
    { className: 'w-15%', title: 'Năm' },
    { className: '', title: 'Tên hoạt động' },
    { className: 'w-10%', title: 'Điểm' },
    { className: 'w-20%', title: 'Ghi chú' },
  ],
}

export default function KetQuaPhucVuCongDong() {
  const [data, setData] = useState([])
  const [totalScore,setTotalScore] = useState()
  const navigate = useNavigate()

  useEffect(() => {
    fetchCommunityActivities()
  }, [])

  const fetchCommunityActivities = async () => {
    const userId = getUserId()

    if (!userId) return

    try {
      const data = await callApiGetUserCommunityActivitiesNoneYear(userId)
      console.log(data)
      const showData = data.filter(item => {
        return item.status === COMMUNITY_ACTIVITY_STATUS.majorHeadConfirmed
      })
      const score = showData.reduce((acc, item) => {
        return acc + item.classPresidentEvaluationScore;
      }, 0);
      setTotalScore(score)
      setData(showData)
    } catch (error) {
      console.error(error)
      handleError(error, navigate)
    }
  }


  const renderBodyTable = () => {
    return data?.length === 0
      ? [<ItemRowNoData key={-1} colSpan={5} />]
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
        <p className='font-semibold text-primary'>Tổng điểm HĐCĐ của cả khóa học: {totalScore} </p>
        <div className='my-2'>
          <Table header={dataTable.header}>{renderBodyTable()}</Table>
        </div>
      </div>
    </>
  )
}
