import React, { useId } from 'react'

export default function InputTextArea({
  label,
  name,
  value,
  onChange,
  disabled,
}) {
  const id = useId()

  return (
    <div className='flex flex-col'>
      {label && (
        <label htmlFor={id} className='py-2 text-main text-normal'>
          {label}
        </label>
      )}
      <textarea
        name={name}
        id={id}
        rows='3'
        className='p-2 rounded-md outline-none border border-normal text-main'
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  )
}
