import React, { useEffect, useRef, useState } from 'react'
import Button from '../Button'

/**
 * const [file, setFile] = useState('https://picsum.photos/150/500')
 *
 * <InputAvatar
        isEdit={false}
        value={file}
        onChange={setFile}
      />
 *
 * @param isEdit
 * @param value
 * @param onChange
 * @returns
 */
export default function InputAvatar({ isEdit, name, value, onChange }) {
  const inputFileRef = useRef(null)
  const [srcImg, setSrcImg] = useState(value)

  useEffect(() => {
    value && typeof value === 'string' && setSrcImg(value)
  }, [value])

  const onClickThem = () => inputFileRef.current.click()

  const onChangeFile = event => {
    const file = event.target.files[0]
    onChange(file)
    setSrcImg(URL.createObjectURL(file))
  }

  return (
    <div>
      <div className='w-150px h-200px mx-auto flex justify-center items-center rounded-md overflow-hidden border border-normal'>
        <img src={srcImg} alt='chưa có ảnh' />
      </div>
      {isEdit && (
        <div className='text-center mt-2'>
          <Button type='outline' label='thêm ảnh' onClick={onClickThem} />
        </div>
      )}

      <input
        type='file'
        ref={inputFileRef}
        name={name}
        onChange={onChangeFile}
        className='hidden'
      />
    </div>
  )
}
