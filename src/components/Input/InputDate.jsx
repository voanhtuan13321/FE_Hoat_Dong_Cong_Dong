import React, { useId } from 'react'
import 'react-datepicker/dist/react-datepicker.css'

/**
 * const [startDate, setStartDate] = useState(new Date())
 * <InputDate label={'tuan'} value={startDate} onChange={date => setStartDate(date)} />
 *
 * @param label
 * @param name
 * @param value
 * @param onChange
 * @param disabled
 */
export default function InputDate({ label, name, value, onChange, disabled }) {
  const id = useId()

  return (
    <div className='flex flex-col'>
      {label && (
        <label htmlFor={id} className='py-2 text-main text-normal'>
          {label}
        </label>
      )}
      <div className='relative'>
        <input
          className='w-full p-2 rounded-md outline-none border border-normal text-main'
          type='date'
          value={new Date(value).toISOString().split('T')[0]}
          onChange={onChange}
          disabled={disabled}
          name={name}
        />
      </div>
    </div>
  )
}
