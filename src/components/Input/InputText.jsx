import React, { useId } from 'react'

/**
 * <InputText label='label' name='name' value={text} onChange={event => setText(event.target.value)} />
 *
 * @param label
 * @param name
 * @param value
 * @param onChange
 * @param disabled
 */
export default function InputText({ label, name, value, onChange, disabled }) {
  const id = useId()

  return (
    <div className='flex flex-col'>
      {label && (
        <label htmlFor={id} className='py-2 text-main text-normal'>
          {label}
        </label>
      )}
      <input
        id={id}
        type='text'
        name={name}
        disabled={disabled}
        className='p-2 rounded-md outline-none border border-normal text-main'
        value={value}
        onChange={onChange}
      />
    </div>
  )
}
