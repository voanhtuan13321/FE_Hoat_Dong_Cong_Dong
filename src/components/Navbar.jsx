import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { routers } from '../utils'

export default function Navbar() {
  const role = useSelector(state => state.role)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const generateClassNameByPath = path => {
    return `text-main border-primary hover:bg-white border hover:text-normal p-2 cursor-pointer select-none
        ${
          location.pathname === path &&
          'font-bold underline bg-white border text-normal'
        }`
  }

  const renderNavs = () => {
    return routers
      .filter(({ roles }) => roles && roles.includes(role))
      .map((router, index) => {
        return (
          <div
            key={index}
            className={generateClassNameByPath(router.path)}
            onClick={() => router.onClick(navigate, dispatch)}
          >
            {router.label}
          </div>
        )
      })
  }

  return (
    <nav className='bg-primary text-white uppercase'>
      <div className='container mx-auto flex'>{renderNavs()}</div>
    </nav>
  )
}
