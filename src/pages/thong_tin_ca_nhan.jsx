import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// component
import Title from '../components/Title'
import InputText from '../components/InputText'
import InputDate from '../components/InputDate'
import InputAvatar from '../components/InputAvatar'
import InputTextArea from '../components/InputTextArea'
import InputSelect from '../components/InputSelect'
import Button from '../components/Button'

// function
import {
  ROLES,
  checkRoles,
  convertObjectToFormData,
  convertToObjectFormFormik,
  handleError,
  requestHandler,
} from '../utils'
import ErrorLabel from '../components/ErrorLabel'

const initInfoUser = {
  id: '',
  classId: '',
  avatar: '',
  firstName: '',
  lastName: '',
  dateOfBirth: new Date('0001-01-01T00:00:00'),
  placeOfBirth: '',
  gender: true,
  ethnic: '',
  nationality: '',
  identificationCardId: '',
  identificationCardIssueDate: new Date('0001-01-01T00:00:00'),
  identificationCardIssuePlace: '',
  religion: '',
  phone: '',
  email: '',
  status: 0,
  facebook: '',
  city: '',
  district: '',
  ward: '',
  street: '',
}

const optionsGender = [
  { name: 'Nam', value: true },
  { name: 'Nữ', value: false },
]

export default function ThongTinCaNhan() {
  const [isShowEdit, setShowEdit] = useState(false)
  const { role, userId } = useSelector(state => state)
  const navigate = useNavigate()

  useEffect(() => {
    if (checkRoles([ROLES.client], role)) {
      alert('bạn phải đăng nhập')
      navigate('/login')
    }
    fetchInfoUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId])

  const fetchInfoUser = async () => {
    if (userId) {
      try {
        const url = 'api/User/GetUserByUserId'
        const optionRequest = { params: { userId } }
        const response = await requestHandler.get(url, optionRequest)
        const data = await response.data

        const newValueFormik = await convertToObjectFormFormik(data)
        // console.log('newValueFormik', newValueFormik)
        formik.setValues(newValueFormik)
      } catch (error) {
        console.error('Failed to get user', error)
        handleError(error, navigate)
      }
    }
  }

  const onSubmit = async values => {
    // Thực hiện xử lý submit ở đây
    const formData = await convertObjectToFormData(values)

    try {
      const url = 'api/User/UpdateUser'
      const optionRequest = {
        headers: { 'Content-Type': 'application/form-data' },
      }
      const response = await requestHandler.put(url, formData, optionRequest)
      const data = await response.data

      const newValueFormik = await convertToObjectFormFormik(data)
      formik.setValues(newValueFormik)
      setShowEdit(false)
    } catch (error) {
      console.error('Failed to update user', error)
      handleError(error, navigate)
    }
  }

  const formik = useFormik({
    initialValues: initInfoUser,
    validationSchema: Yup.object({
      firstName: Yup.string()
        .required('First Name is required')
        .max(20, 'First name không được quá 20 ký tự'),
      lastName: Yup.string()
        .required('Last Name is required')
        .max(20, 'Last name không được quá 20 ký tự'),
      placeOfBirth: Yup.string().max(
        30,
        'Place of Birth không được quá 30 ký tự',
      ),
      ethnic: Yup.string().max(20, 'Ethnic không được quá 20 k'),
      nationality: Yup.string().max(25, 'Nationality không được quá 25 ký tự'),
      identificationCardId: Yup.string().max(
        20,
        'IdentificationCardId không được quá 20 ký tự',
      ),
      identificationCardIssuePlace: Yup.string().max(
        30,
        'IdentificationCardIssuePlace không được quá 30 ký tự',
      ),
      religion: Yup.string().max(50, 'religion không được quá 50 ký tự'),
      phone: Yup.string().matches(
        /^(?:\+84|0)(\d{9,10})$/,
        'Số điện thoại không hợp lệ',
      ),
      email: Yup.string().email('Email không hợp lệ'),
    }),
    onSubmit: onSubmit,
  })

  const generatedProperties = name => ({
    name: name,
    disabled: !isShowEdit,
    onChange: formik.handleChange,
    value: formik.values[name],
  })

  const onClickHuy = async () => {
    await fetchInfoUser()
    setShowEdit(false)
  }

  return (
    <div className='container mx-auto pb-5'>
      <Title title='thông tin cá nhân' />
      <form
        className='grid grid-cols-3 grid-flow-row gap-4 mt-5 w-[800px] mx-auto'
        onSubmit={formik.handleSubmit}
      >
        <div className='row-span-3'>
          <InputAvatar
            isEdit={isShowEdit}
            name='avatar'
            value={formik.values.avatar}
            onChange={file => formik.setFieldValue('avatar', file)}
          />
        </div>
        <div>
          <InputText label='Họ' {...generatedProperties('firstName')} />
          <ErrorLabel formik={formik} keyFormik='firstName' />
        </div>
        <div>
          <InputText label='Tên' {...generatedProperties('lastName')} />
          <ErrorLabel formik={formik} keyFormik='lastName' />
        </div>
        <div>
          <InputDate
            label='Ngày sinh'
            name='dateOfBirth'
            disabled={!isShowEdit}
            onChange={date => formik.setFieldValue('dateOfBirth', date)}
            value={formik.values.dateOfBirth}
          />
        </div>
        <div>
          <InputText
            label='Nơi sinh'
            {...generatedProperties('placeOfBirth')}
          />
          <ErrorLabel formik={formik} keyFormik='placeOfBirth' />
        </div>
        <div>
          <InputSelect
            label='Giới tính'
            disabled={!isShowEdit}
            options={optionsGender}
            value={optionsGender.find(
              item => item.value === formik.values.gender,
            )}
            onChange={({ value }) => formik.setFieldValue('gender', value)}
          />
        </div>
        <div>
          <InputText label='Email' {...generatedProperties('email')} />
          <ErrorLabel formik={formik} keyFormik='email' />
        </div>
        <div>
          <InputText label='Dân tộc' {...generatedProperties('ethnic')} />
          <ErrorLabel formik={formik} keyFormik='ethnic' />
        </div>
        <div>
          <InputText label='Số điện thoại' {...generatedProperties('phone')} />
          <ErrorLabel formik={formik} keyFormik='phone' />
        </div>
        <div>
          <InputText
            label='Quốc tịch'
            {...generatedProperties('nationality')}
          />
          <ErrorLabel formik={formik} keyFormik='nationality' />
        </div>
        <div className='col-span-2'>
          <InputText label='Facebook' {...generatedProperties('facebook')} />
        </div>
        <div>
          <InputText label='Tôn giáo' {...generatedProperties('religion')} />
          <ErrorLabel formik={formik} keyFormik='religion' />
        </div>
        <div>
          <InputText
            label='CCCD'
            {...generatedProperties('identificationCardId')}
          />
          <ErrorLabel formik={formik} keyFormik='identificationCardId' />
        </div>
        <div>
          <InputDate
            label='Ngày cấp'
            disabled={!isShowEdit}
            onChange={date =>
              formik.setFieldValue('identificationCardIssueDate', date)
            }
            onBlur={date =>
              formik.setFieldValue('identificationCardIssueDate', date)
            }
            value={formik.values.identificationCardIssueDate}
          />
        </div>
        <div>
          <InputText
            label='Nơi cấp'
            {...generatedProperties('identificationCardIssuePlace')}
          />
          <ErrorLabel
            formik={formik}
            keyFormik='identificationCardIssuePlace'
          />
        </div>
        <div>
          <InputText label='Thành phố/Tỉnh' {...generatedProperties('city')} />
        </div>
        <div>
          <InputText label='Quận/Huyện' {...generatedProperties('district')} />
        </div>
        <div>
          <InputText label='Phường/Xã' {...generatedProperties('ward')} />
        </div>
        <div className='col-span-3'>
          <InputTextArea label='Tên đường' {...generatedProperties('street')} />
        </div>
        <div className='col-span-3 flex justify-end gap-4'>
          {isShowEdit && (
            <>
              <Button label='lưu' submit={true} />
              <Button label='huỷ' type='outline' onClick={onClickHuy} />
            </>
          )}
        </div>
      </form>
      <div className='w-[800px] mx-auto text-end'>
        {!isShowEdit && (
          <Button label='sửa' onClick={() => setShowEdit(true)} />
        )}
      </div>
    </div>
  )
}
