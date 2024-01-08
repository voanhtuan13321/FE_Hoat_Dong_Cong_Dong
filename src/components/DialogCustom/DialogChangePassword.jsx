import React from 'react'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import toast from 'react-hot-toast'

import DialogCustom from '.'
import ErrorLabel from '../ErrorLabel'
import InputPassword from '../Input/InputPassword'
import Button from '../Button'

import { callApiChangePassword, handleError } from '../../utils'

const initialValues = { password: '', passwordConfirm: '' }

export default function DialogChangePassword({
  userId,
  isShowDialog,
  setShowDialog,
}) {
  const navigate = useNavigate()

  const validationSchema = Yup.object({
    password: Yup.string().required('Bắt buộc nhập'),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Nhập lại mật khẩu không khớp')
      .required('Bắt buộc nhập'),
  })

  const onSubmit = async values => {
    try {
      const dataRequest = { ...values, userId }
      const data = await callApiChangePassword(dataRequest)
      // console.log(dataRequest)
      toast.success('Cập nhật thành công')
      setShowDialog(false)
    } catch (error) {
      console.error(error)
      handleError(error, navigate)
    }
  }

  const formik = useFormik({ initialValues, validationSchema, onSubmit })

  const generatedProperties = name => ({
    name: name,
    onChange: formik.handleChange,
    value: formik.values[name],
  })

  const onClickCancelCreateUser = () => {
    setShowDialog(false)
    formik.setValues(initialValues)
  }

  return (
    <DialogCustom isOpen={isShowDialog} title='cập nhật mật khẩu'>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <InputPassword
            label='Mật khẩu mới'
            {...generatedProperties('password')}
          />
          <ErrorLabel formik={formik} keyFormik='password' />
        </div>
        <div>
          <InputPassword
            label='Nhập lại mật khẩu'
            {...generatedProperties('passwordConfirm')}
          />
          <ErrorLabel formik={formik} keyFormik='passwordConfirm' />
        </div>
        <div className='col-span-2 mt-4 flex justify-end gap-2'>
          <Button
            label='Huỷ'
            type='outline'
            onClick={onClickCancelCreateUser}
          />
          <Button label='Cập nhật' submit={true} />
        </div>
      </form>
    </DialogCustom>
  )
}
