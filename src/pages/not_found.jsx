import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='max-w-2xl w-full text-center p-8 relative'>
        <div className='absolute left-0 right-0 top-1/2 transform -translate-y-1/2 z-0'>
          <div className='w-full bg-white rounded-full h-32'></div>
          <div className='w-full bg-white rounded-full h-32 scale-125 transform relative z-10'></div>
          <div className='w-full bg-white rounded-full h-32 relative z-90 shadow-md'></div>
        </div>

        <div className='z-50  absolute left-0 right-0 top-1/2 transform -translate-y-1/2'>
          <h1 className='font-quicksand text-6xl uppercase font-bold mb-4'>
            oops!
          </h1>
          <h2 className='font-quicksand text-2xl font-bold mb-8'>
            Error 404: Không tìm thấy trang
          </h2>
          <Link
            to='/'
            className='font-quicksand text-white text-sm uppercase bg-primary px-6 py-3 rounded-full font-bold'
          >
            trang chủ
          </Link>
        </div>
      </div>
    </div>
  )
}
