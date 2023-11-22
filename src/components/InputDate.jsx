import React, { useId, useRef } from 'react'
import DatePicker from 'react-datepicker'
import { MdDateRange } from 'react-icons/md'
import 'react-datepicker/dist/react-datepicker.css'

/**
 * const [startDate, setStartDate] = useState(new Date())
 * <InputDate label={'tuan'} value={startDate} onChange={date => setStartDate(date)} />
 *
 * @param label
 * @param name
 * @param value
 * @param onChange
 */
export default function InputDate({ label, name, value, onChange }) {
  const id = useId()
  const datepickerRef = useRef(null)

  const onClickIcon = () => {
    datepickerRef.current.handleFocus()
  }

  return (
    <div className='flex flex-col'>
      <label htmlFor={id} className='py-2 text-main text-normal'>
        {label}
      </label>

      <div className='relative'>
        <DatePicker
          id={id}
          ref={datepickerRef}
          name={name}
          selected={value}
          onChange={onChange}
          withPortal='100%'
          dateFormat='dd/MM/yyyy'
          className='w-full outline-none border border-normal rounded-md p-2 text-main'
        />
        <MdDateRange
          className='absolute top-2 right-2 cursor-pointer'
          onClick={onClickIcon}
        />
      </div>
    </div>
  )
}
