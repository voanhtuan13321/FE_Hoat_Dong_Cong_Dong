import React, { useId } from 'react'

/**
 * <InputText label='label' name='name' value={text} onChange={event => setText(event.target.value)} />
 *
 * @param label
 * @param name
 * @param value
 * @param onChange
 */
export default function InputPassword({ label, name, value, onChange }) {
  const id = useId()

  return (
    <div className='flex flex-col'>
      <label htmlFor={id} className='py-2'>
        {label}
      </label>
      <input
        id={id}
        type='text'
        name={name}
        className='p-2 rounded-md outline-none border'
        value={value}
        onChange={onChange}
      />
    </div>
  )
}
