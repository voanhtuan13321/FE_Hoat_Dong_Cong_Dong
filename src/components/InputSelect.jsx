import React, { Fragment, useId } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { FaCheck, FaChevronDown } from 'react-icons/fa'

/**
 * const options = [
    { name: 'Wade Cooper', value: 1 },
    { name: 'Arlene Mccoy', value: 2 },
    { name: 'Devon Webb', value: 3 },
  ]
 * const [selected, setSelected] = useState(options[0])
 * 
 * <InputSelect
      label={'tuan'}
      options={options}
      value={selected}
      onChange={setSelected}
    />
 *
 * @param label
 * @param name
 * @param value
 * @param onChange
 * @param options
 * @param disabled
 */
export default function InputSelect({
  label,
  name,
  value,
  onChange,
  options,
  disabled,
}) {
  const id = useId()

  const renderOptions = () => {
    return options.map((option, index) => (
      <Listbox.Option
        key={index}
        className={({ active }) =>
          `relative cursor-pointer select-none p-2 pl-10 ${
            active ? 'bg-primary text-white' : 'text-gray-900'
          }`
        }
        value={option}
      >
        {({ selected }) => (
          <>
            <span
              className={`block truncate text-main
                ${selected ? 'font-medium' : 'font-normal'}`}
            >
              {option.name}
            </span>
            {selected && (
              <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-primary'>
                <FaCheck />
              </span>
            )}
          </>
        )}
      </Listbox.Option>
    ))
  }

  return (
    <div className='flex flex-col'>
      {label && (
        <label htmlFor={id} className='py-2 text-main text-normal'>
          {label}
        </label>
      )}
      <div>
        <Listbox value={value} onChange={onChange} disabled={disabled}>
          <Listbox.Button className='relative w-full cursor-default rounded-md bg-white p-2 text-left border border-normal outline-none text-main'>
            <span className='block truncate'>{value.name}</span>
            <span className='pointer-events-none absolute inset-y-0 right-2 flex items-center'>
              <FaChevronDown />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Listbox.Options className='absolute mt-1 max-h-60 overflow-auto rounded-md bg-white text-base border border-normal ring-1 ring-black/5 outline-none text-main z-50'>
              {renderOptions()}
            </Listbox.Options>
          </Transition>
        </Listbox>
      </div>
    </div>
  )
}
