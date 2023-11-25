import React, { useId } from 'react'

/**
 * <InputRadio label='label' name='name' value={check} onChange={() => setCheck(!check)} />
 *
 * @param label
 * @param name
 * @param value
 * @param onChange
 * @param disabled
 */
export default function InputRadio({ label, name, value, onChange, disabled }) {
  const id = useId()

  return (
    <div className='flex items-center justify-center'>
      <input
        id={id}
        type='radio'
        name={name}
        checked={value}
        className='w-4 h-4 bg-gray-100 border-normal'
        onChange={onChange}
        disabled={disabled}
      />
      {label && (
        <label
          htmlFor={id}
          className={`ms-2 text-main font-medium text-normal`}
        >
          {label}
        </label>
      )}
    </div>
  )
}
