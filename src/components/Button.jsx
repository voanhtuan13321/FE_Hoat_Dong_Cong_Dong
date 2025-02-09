import React from 'react'
import { MdEdit, MdDelete, MdAdd } from 'react-icons/md'

const icon = {
  edit: <MdEdit />,
  delete: <MdDelete />,
  add: <MdAdd />,
}

/**
 * <Button type='primary' label='Tìm kiếm' onClick={event => alert('click')} />
 *
 * @param type loại button (primary, outline, edit, delete, add)
 * @param label chữ bên trong button
 * @param onClick function xử lí khi click vào button
 */
export default function Button({ type, label, onClick, submit, disable = false }) {
  const renClassName = () => {
    switch (type) {
      case 'outline':
        return 'bg-second-color border border-normal'
      case 'edit':
        return 'bg-yellow-400 text-white'
      case 'delete':
        return 'bg-red-500 text-white'
      case 'add':
        return 'bg-primary text-white'
      default:
        return 'bg-primary text-white'
    }
  }

  const isShowIcon = () => ['edit', 'delete', 'add'].includes(type)

  return (
    <button
      className={`px-4 py-2 rounded-md uppercase text-main relative font-bold
        ${renClassName()} ${isShowIcon() && 'pl-8'} ${disable ? 'opacity-60 cursor-default' : 'hover:opacity-80'}`}
      onClick={disable ? () => {} : onClick}
      type={submit ? 'submit' : 'button'}
    >
      {label}
      <div className='absolute top-0 bottom-0 left-3 flex items-center'>{isShowIcon() && icon[type]}</div>
    </button>
  )
}
