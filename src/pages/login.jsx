import React from 'react'
import InputText from '../components/InputText'
import Button from '../components/Button'
import User_login from '../assets/images/User_login.png'

export default function Login() {
  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='w-600px h-250px rounded-lg border border-gray-300'>
        <div className='flex p-5 items-start gap-4'>
          <div className='flex-none mt-3'>
            <img src={User_login} alt='' />
          </div>
          <div className='flex-1 w-full flex flex-col justify-center items-start gap-5'>
            <InputText label='Tài khoản' />
            <InputText label='Mật khẩu' />
          </div>
        </div>
        <div className='flex justify-center'>
          <Button label='Đăng nhập' />
        </div>
      </div>
    </div>
  )
}
