import React from 'react'

/**
 * <Button type='primary' label='Tìm kiếm' onClick={event => alert('click')} />
 *
 * @param type loại button (primary, outline)
 * @param label chữ bên trong button
 * @param onClick function xử lí khi click vào button
 */
export default function Button({ type, label, onClick }) {
  const renClassName = () => {
    if (type === 'outline') {
      return 'bg-second-color border border-normal'
    }
    return 'bg-primary text-white'
  }

  return (
    <button
      className={`${renClassName()} px-4 py-2 rounded-md hover:opacity-80 uppercase`}
      onClick={onClick}
    >
      {label}
    </button>
  )
}
