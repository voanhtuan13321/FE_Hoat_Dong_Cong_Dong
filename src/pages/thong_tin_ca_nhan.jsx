import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'

// component
import Title from '../components/Title'
import InputText from '../components/Input/InputText'
import InputDate from '../components/Input/InputDate'
import InputAvatar from '../components/Input/InputAvatar'
import InputTextArea from '../components/Input/InputTextArea'
import InputSelect from '../components/Input/InputSelect'
import Button from '../components/Button'

// function
import {
  REGEX,
  ROLES,
  callApiGetUserByUserId,
  callApiUpdateUser,
  checkAndHandleLogined,
  checkPermissionToAccessThePage,
  convertObjectToFormData,
  convertToObjectFormFormik,
  getUserId,
  getUserRole,
  handleError,
  optionsGender,
} from '../utils'
import ErrorLabel from '../components/ErrorLabel'
import toast from 'react-hot-toast'

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

export default function ThongTinCaNhan() {
  const [isShowEdit, setShowEdit] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    console.log(getUserRole())
    checkAndHandleLogined(navigate)
    const targetRoles = [ROLES.client, ROLES.giaoVien, ROLES.truongKhoa]
    checkPermissionToAccessThePage(getUserRole(), targetRoles, navigate)
    fetchInfoUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchInfoUser = async () => {
    const userId = getUserId()
    if (userId) {
      try {
        const data = await callApiGetUserByUserId(userId)
        const newValueFormik = await convertToObjectFormFormik(data)
        // console.log('newValueFormik', newValueFormik)
        formik.setValues(newValueFormik)
      } catch (error) {
        console.error('Failed to get user', error)
        // handleError(error, navigate)
      }
    }
  }

  const onSubmit = async values => {
    // Thực hiện xử lý submit ở đây
    const formData = await convertObjectToFormData(values)

    try {
      const data = await callApiUpdateUser(formData)
      // console.log(data)
      const newValueFormik = await convertToObjectFormFormik(data)
      toast.success('Cập nhật thành công')
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
        .required('Bắt buộc nhập')
        .max(20, 'Không được quá 20 ký tự'),
      lastName: Yup.string()
        .required('Tên bắt buộc phải nhập')
        .max(20, 'Tên không được quá 20 ký tự'),
      placeOfBirth: Yup.string().max(30, 'Nơi sinh không được quá 30 ký tự'),
      ethnic: Yup.string()
        .max(20, 'Dân tộc không được quá 20 k')
        .matches(REGEX.textOnly, 'Dân tộc không được chứa số'),
      nationality: Yup.string()
        .max(25, 'Quốc tịch không được quá 25 ký tự')
        .matches(REGEX.textOnly, 'Dân tộc không được chứa số'),
      identificationCardId: Yup.string().max(
        20,
        'CCCD không được quá 20 ký tự',
      ),
      identificationCardIssueDate: Yup.date().max(
        new Date(),
        'Ngày không được lớn hơn ngày hiện tại',
      ),
      identificationCardIssuePlace: Yup.string().max(
        30,
        'Nơi cấp CCCD không được quá 30 ký tự',
      ),
      religion: Yup.string().max(50, 'religion không được quá 50 ký tự'),
      phone: Yup.string().matches(REGEX.phoneNum, 'Số điện thoại không hợp lệ'),
      email: Yup.string().email('Email không hợp lệ'),
      facebook: Yup.string().matches(REGEX.link, 'facebook không hợp lệ'),
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
          <InputText
            label='Họ'
            {...generatedProperties('firstName')}
            disabled={true}
          />
          <ErrorLabel formik={formik} keyFormik='firstName' />
        </div>
        <div>
          <InputText
            label='Tên'
            {...generatedProperties('lastName')}
            disabled={true}
          />
          <ErrorLabel formik={formik} keyFormik='lastName' />
        </div>
        <div>
          <InputDate
            label='Ngày sinh'
            name='dateOfBirth'
            disabled={true}
            onChange={formik.onChange}
            value={formik.values.dateOfBirth}
          />
        </div>
        <div>
          <InputSelect
            label='Giới tính'
            options={optionsGender}
            value={optionsGender.find(
              item => item.value === formik.values.gender,
            )}
            onChange={({ value }) => formik.setFieldValue('gender', value)}
            disabled={true}
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
          <ErrorLabel formik={formik} keyFormik='facebook' />
        </div>
        <div>
          <InputText label='Tôn giáo' {...generatedProperties('religion')} />
          <ErrorLabel formik={formik} keyFormik='religion' />
        </div>
        <div>
          <InputText
            label='CCCD'
            {...generatedProperties('identificationCardId')}
            disabled={true}
          />
          <ErrorLabel formik={formik} keyFormik='identificationCardId' />
        </div>
        <div>
          <InputDate
            label='Ngày cấp'
            name='identificationCardIssueDate'
            onChange={event =>
              formik.setFieldValue(
                'identificationCardIssueDate',
                new Date(event.target.value),
              )
            }
            value={formik.values.identificationCardIssueDate}
            disabled={!isShowEdit}
          />
          <ErrorLabel formik={formik} keyFormik='identificationCardIssueDate' />
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
