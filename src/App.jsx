import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { routers } from './utils'

export default function App() {
  const renderRoutes = () => {
    return routers.map((router, index) => {
      return <Route key={index} path={router.path} element={router.element} />
    })
  }

  return (
    <>
      <Routes>{renderRoutes()}</Routes>
    </>
  )
}
