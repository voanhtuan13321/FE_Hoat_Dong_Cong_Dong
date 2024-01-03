import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import toast from 'react-hot-toast'
import { jwtDecode } from 'jwt-decode'
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// component
import InputText from '../components/InputText'
import InputPassword from '../components/InputPassword'
import Button from '../components/Button'
import ErrorLabel from '../components/ErrorLabel'

// image
import User_login from '../assets/images/User_login.png'

// function
import { KEY_ROLE_TOKEN, localStorages, requestHandler } from '../utils'
import { setLoading, setRole } from '../redux/storeSlice'

const initialFormLogin = { accountId: '', password: '' }

export default function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorages.getToken()
    token && navigate('/')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSubmit = async values => {
    // Thực hiện xử lý submit ở đây
    try {
      dispatch(setLoading(true))
      const response = await requestHandler.post('/api/Auth/Login', values)
      const { token } = await response.data
      toast.success('Đăng nhập thành công')
      localStorages.setToken(token)

      const decoded = jwtDecode(token)
      dispatch(setRole(decoded[KEY_ROLE_TOKEN]))
      navigate('/')
    } catch (error) {
      handleLoginError(error)
      alert(error.message)
    } finally {
      dispatch(setLoading(false))
    }
  }

  const handleLoginError = error => {
    switch (error.response.status) {
      case 400:
        Swal.fire('Tài khoản hoặc mật khẩu đang có ký tự đặc biệt', '', 'error')
        break
      case 401:
        Swal.fire('Tài khoản hoặc mật khẩu không đúng', '', 'error')
        break
      case 403:
        Swal.fire('Tài khoản của bạn đã bị khoá', '', 'error')
        break
      default:
        alert(error.message)
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
            <ErrorLabel formik={formik} keyFormik='accountId' />
            <InputPassword
              label='Mật khẩu'
              name='password'
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            <ErrorLabel formik={formik} keyFormik='password' />
          </div>
        </div>
        <div className='flex justify-center'>
          <Button label='Đăng nhập' submit />
        </div>
      </form>
    </div>
  )
}
