import React, { useId } from 'react'

export default function InputPassword({ value, onChange }) {
  const id = useId()

  return (
    <div>
      <label htmlFor={id}></label>
      <input id={id} type='password' value={value} onChange={onChange} />
    </div>
  )
}
