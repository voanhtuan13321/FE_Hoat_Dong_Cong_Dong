import React from 'react'

export default function Button({ type, text, onClick }) {
  const renClassName = () => {
    return ''
  }

  return (
    <button className={`${renClassName()}`} onClick={onClick}>
      {text}
    </button>
  )
}
