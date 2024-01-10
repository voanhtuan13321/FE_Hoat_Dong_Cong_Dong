import React, { useEffect, useState } from 'react'
import { format } from 'date-fns'

import Title from '../components/Title'
import Pagination from '../components/Pagination'

import { callApiGetAnnouncementsPaginationList } from '../utils'

export default function Home() {
  const [listAnnouncements, setListAnnouncements] = useState({})

  useEffect(() => {
    fetchListAnnouncements(0)
  }, [])

  const fetchListAnnouncements = async page => {
    try {
      const response = await callApiGetAnnouncementsPaginationList(5, page)
      const data = response
      setListAnnouncements(data)
    } catch (error) {
      console.error(error)
    }
  }

  const renderBody = () => {
    return listAnnouncements?.data?.map((dt, index) => (
      <div
        key={index}
        className='flex flex-col text-main border-b-2 px-3 pb-2 my-4 gap-2'
      >
        <div className='flex flex-row gap-8'>
          <p className='text-red-text font-bold'>
            {format(new Date(dt.createdAt), 'dd/MM/yyyy')}
          </p>
          <p className='text-primary font-bold'>{dt.title}</p>
        </div>
        <p className=''>{dt.content}</p>
      </div>
    ))
  }

  return (
    <>
      <div className='container mx-auto'>
        <Title title='Thông báo' />
        {renderBody()}
      </div>
      <Pagination
        totalItems={listAnnouncements.totalItems}
        totalPages={listAnnouncements.totalPages}
        itemPerPage={listAnnouncements.itemPerPage}
        currentPage={listAnnouncements.currentPage}
        isNextPage={listAnnouncements.isNextPage}
        isPreviousPage={listAnnouncements.isPreviousPage}
        onPageChange={fetchListAnnouncements}
      />
    </>
  )
}
