import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Title from '../components/Title'
import InputText from '../components/InputText'
import InputDate from '../components/InputDate'
import InputAvatar from '../components/InputAvatar'
import InputTextArea from '../components/InputTextArea'
import Button from '../components/Button'

const initInfoUser = {
  avatar: '',
  hoVaTen: 'afasdf',
  gioiTinh: '',
  ngaySinh: new Date(),
  noiSinh: '',
  email: '',
  soDienThoai: '',
  danToc: '',
  quocTich: '',
  facebook: '',
  tonGiao: '',
  cccd: '',
  ngayCap: new Date(),
  noiCap: '',
  thanhPho: '',
  quan: '',
  phuong: '',
  tenDuong: '',
}

export default function ThongTinCaNhan() {
  const [isShowEdit, setShowEdit] = useState(false)
  const [infoUser, setInputUser] = useState(initInfoUser)

  useEffect(() => {
    fetchInfoUser()
  }, [])

  const fetchInfoUser = () => {
    setInputUser(initInfoUser)
  }

  const onSubmit = (values, { resetForm }) => {
    // Thực hiện xử lý submit ở đây
    console.log(values)
  }

  const formik = useFormik({
    initialValues: infoUser,
    validationSchema: Yup.object({}),
    onSubmit: onSubmit,
  })

  const generatedProperties = name => ({
    name: name,
    disabled: !isShowEdit,
    onChange: formik.handleChange,
    value: formik.values[name],
  })

  const onClickHuy = () => {
    fetchInfoUser()
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
          <InputText label='Tên' {...generatedProperties('hoVaTen')} />
        </div>
        <div>
          <InputText label='Giới tính' {...generatedProperties('gioiTinh')} />
        </div>
        <div>
          <InputDate
            label='Ngày sinh'
            name='ngaySinh'
            disabled={!isShowEdit}
            onChange={date => formik.setFieldValue('ngaySinh', date)}
            value={formik.values.ngaySinh}
          />
        </div>
        <div>
          <InputText label='Nơi sinh' {...generatedProperties('noiSinh')} />
        </div>
        <div className='col-span-2'>
          <InputText label='Email' {...generatedProperties('email')} />
        </div>
        <div>
          <InputText
            label='Số điện thoại'
            {...generatedProperties('soDienThoai')}
          />
        </div>
        <div>
          <InputText label='Dân tộc' {...generatedProperties('danToc')} />
        </div>
        <div>
          <InputText label='Quốc tịch' {...generatedProperties('quocTich')} />
        </div>
        <div className='col-span-2'>
          <InputText label='Facebook' {...generatedProperties('facebook')} />
        </div>
        <div>
          <InputText label='Tôn giáo' {...generatedProperties('tonGiao')} />
        </div>
        <div>
          <InputText label='CCCD' {...generatedProperties('cccd')} />
        </div>
        <div>
          <InputDate
            label='Ngày cấp'
            disabled={!isShowEdit}
            onChange={date => formik.setFieldValue('ngayCap', date)}
            onBlur={date => formik.setFieldValue('ngayCap', date)}
            value={formik.values.ngayCap}
          />
        </div>
        <div>
          <InputText label='Nơi cấp' {...generatedProperties('noiCap')} />
        </div>
        <div>
          <InputText
            label='Thành phố/Tỉnh'
            {...generatedProperties('thanhPho')}
          />
        </div>
        <div>
          <InputText label='Quận/Huyện' {...generatedProperties('quan')} />
        </div>
        <div>
          <InputText label='Phường/Xã' {...generatedProperties('phuong')} />
        </div>
        <div className='col-span-3'>
          <InputTextArea
            label='Tên đường'
            {...generatedProperties('tenDuong')}
          />
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
