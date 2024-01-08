import React from 'react'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import toast from 'react-hot-toast'

import DialogCustom from '.'
import InputText from '../Input/InputText'
import ErrorLabel from '../ErrorLabel'
import InputSelect from '../Input/InputSelect'
import InputDate from '../Input/InputDate'
import Button from '../Button'

import {
  REGEX,
  callApiCreateUser,
  handleError,
  optionsGender,
} from '../../utils'

const initialValues = {
  classId: '',
  firstName: '',
  lastName: '',
  gender: true,
  dateOfBirth: new Date(),
  identificationCardId: '',
  isStudent: true,
}

export default function DialogCreateUserStudent({
  isShowDialog,
  setShowDialog,
  classId,
  refresh,
}) {
  const navigate = useNavigate()

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .required('Bắt buộc nhập')
      .matches(REGEX.textOnly, 'Không được chứa số và ký tự đặc biệt'),
    lastName: Yup.string()
      .required('Bắt buộc nhập')
      .matches(REGEX.textOnly, 'Không được chứa số và ký tự đặc biệt'),
    dateOfBirth: Yup.date()
      .required('Bắt buộc nhập')
      .max(new Date(), 'Ngày không được lớn hơn ngày hiện tại'),
    identificationCardId: Yup.string().required('Bắt buộc nhập'),
  })

  const onSubmit = async values => {
    try {
      const dataRequest = { ...values, classId }
      const data = await callApiCreateUser(dataRequest)
      // console.log(data)
      toast.success('Thêm mới thành công')
      setShowDialog(false)
      formik.setValues(initialValues)
      refresh()
    } catch (error) {
      console.error(error)
      formik.setFieldError('identificationCardId', 'CCCD bị trùng')
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
    <DialogCustom isOpen={isShowDialog} title='thêm mới sinh viên'>
      <form
        className='grid grid-cols-2 gap-2 w-[500px]'
        onSubmit={formik.handleSubmit}
      >
        <div>
          <InputText label='Họ' {...generatedProperties('firstName')} />
          <ErrorLabel formik={formik} keyFormik='firstName' />
        </div>
        <div>
          <InputText label='Tên' {...generatedProperties('lastName')} />
          <ErrorLabel formik={formik} keyFormik='lastName' />
        </div>
        <div>
          <InputSelect
            label='Giới tính'
            options={optionsGender}
            value={optionsGender.find(
              item => item.value === formik.values.gender,
            )}
            onChange={({ value }) => formik.setFieldValue('gender', value)}
          />
        </div>
        <div>
          <InputDate
            label='Ngày sinh'
            name='dateOfBirth'
            onChange={event =>
              formik.setFieldValue('dateOfBirth', new Date(event.target.value))
            }
            value={formik.values.dateOfBirth}
          />
          <ErrorLabel formik={formik} keyFormik='dateOfBirth' />
        </div>
        <div className='col-span-2'>
          <InputText
            label='CCCD'
            {...generatedProperties('identificationCardId')}
          />
          <ErrorLabel formik={formik} keyFormik='identificationCardId' />
        </div>
        <div className='col-span-2 mt-4 flex justify-end gap-2'>
          <Button
            label='Huỷ'
            type='outline'
            onClick={onClickCancelCreateUser}
          />
          <Button label='Tạo mới' submit={true} />
        </div>
      </form>
    </DialogCustom>
  )
}
