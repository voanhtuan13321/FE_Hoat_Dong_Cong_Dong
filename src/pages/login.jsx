import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import toast from 'react-hot-toast'
import { jwtDecode } from 'jwt-decode'
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import InputText from '../components/InputText'
import InputPassword from '../components/InputPassword'
import Button from '../components/Button'
import User_login from '../assets/images/User_login.png'
import { requestHandler } from '../utils/requestHandler'
import { localStorages } from '../utils'
import { setRole } from '../redux/storeSlice'

const initialFormLogin = {
  accountId: '',
  password: '',
}

export default function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSubmit = async (values, { resetForm }) => {
    // Thực hiện xử lý submit ở đây
    try {
      const response = await requestHandler.post('/api/Auth/Login', values)
      const { token } = await response.data
      toast.success('Successfully toasted!')
      localStorages.setToken(token)

      const decoded = jwtDecode(token)
      dispatch(setRole(decoded.roles))
      navigate('/')
    } catch (error) {
      const { response } = error
      switch (response.status) {
        case 400:
          Swal.fire('Tài khoản hoặc mật khẩu không đúng', '', 'error')
          break
        case 403:
          Swal.fire('Tài khoản của bạn đã bị khoá', '', 'error')
          break
        default:
          alert(error.message)
      }
    }
  }

  const formik = useFormik({
    initialValues: initialFormLogin,
    validationSchema: Yup.object({
      accountId: Yup.string().required('Bạn phải nhập trường này'),
      password: Yup.string().required('Bạn phải nhập trường này'),
    }),
    onSubmit: onSubmit,
  })

  return (
    <div className='flex justify-center items-center h-80vh'>
      <form
        className='w-600px rounded-lg border border-gray-300 pb-5'
        onSubmit={formik.handleSubmit}
      >
        <div className='flex p-5 gap-4'>
          <div className='w-30% mt-3'>
            <img src={User_login} alt='' />
          </div>
          <div className='w-70% flex flex-col justify-center'>
            <InputText
              label='Id'
              name='accountId'
              value={formik.values.accountId}
              onChange={formik.handleChange}
            />
            {formik.touched.accountId && (
              <span className='text-red-500 text-main'>
                {formik.errors.accountId}
              </span>
            )}
            <InputPassword
              label='Mật khẩu'
              name='password'
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            {formik.touched.password && (
              <span className='text-red-500 text-main'>
                {formik.errors.password}
              </span>
            )}
          </div>
        </div>
        <div className='flex justify-center'>
          <Button label='Đăng nhập' submit />
        </div>
      </form>
    </div>
  )
}
