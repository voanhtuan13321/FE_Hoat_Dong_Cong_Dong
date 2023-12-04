import React, { useEffect, useState } from 'react'
import Title from '../components/Title'

const data = {
  value: [
    {
      date: '20/11/2023',
      content:
        'Lịch thi chính thức cuối kỳ 1/2023-2024 và Lịch đăng ký bổ sung (cho các Sinh viên hoãn thi)',
    },
    {
      date: '20/11/2023',
      content:
        'Lịch thi chính thức cuối kỳ 1/2023-2024 và Lịch đăng ký bổ sung (cho các Sinh viên hoãn thi)',
    },
  ],
}

export default function Home() {
  const [listThongBao, setListThongBao] = useState([])

  useEffect(() => {
    fetchListThongBao()
  }, [])

  const fetchListThongBao = () => {
    setListThongBao(data.value)
  }

  const renderBody = () => {
    let arrJsx = listThongBao.map((dt, index) => {
      return (
        <div key={index} className='flex flex-col text-main border-b-2 px-3 pb-2 my-4 gap-2'>
          <div className='flex flex-row gap-8'>
            <p className='w-10% text-red-text font-bold'>{dt.date}</p>
            <p className='text-primary font-bold'>{dt.content}</p>
          </div>

          <p className=''>
            Sinh viên xem thông báo <span className='cursor-pointer underline'>tại đây</span>
          </p>
        </div>
      )
    })
    return arrJsx
  }

  return (
    <>
      <div className='container mx-auto'>
        <Title title='Thông báo' />
        {renderBody()}
      </div>
    </>
  )
}
