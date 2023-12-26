import React from 'react'

export default function ErrorLabel({ formik, keyFormik }) {
  return (
    <>
      {formik.touched[keyFormik] && (
        <span className='text-red-500 text-main'>
          {formik.errors[keyFormik]}
        </span>
      )}
    </>
  )
}
