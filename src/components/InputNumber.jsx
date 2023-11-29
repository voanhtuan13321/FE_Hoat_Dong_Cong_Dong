import React, { useId } from 'react'

/**
 * <InputNumber label='label' name='name' value={text} onChange={event => setText(event.target.value)} />
 *
 * @param label
 * @param name
 * @param value
 * @param onChange
 * @param disabled
 */
export default function InputNumber({
  label,
  name,
  value,
  min,
  max,
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
      <input
        id={id}
        type='number'
        name={name}
        min={min}
        max={max}
        className='p-2 rounded-md outline-none border border-normal text-main'
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  )
}
