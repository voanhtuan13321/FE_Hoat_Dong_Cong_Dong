import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import { routers } from './utils'

export default function App() {
  const renderRoutes = () => {
    return routers.map((router, index) => {
      return <Route key={index} path={router.path} element={router.element} />
    })
  }

  return (
    <>
      <Header />
      <Routes>{renderRoutes()}</Routes>
      <Footer />
    </>
  )
}
