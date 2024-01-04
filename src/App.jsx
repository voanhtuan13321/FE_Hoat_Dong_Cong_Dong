import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { jwtDecode } from 'jwt-decode'
import { Toaster } from 'react-hot-toast'

// component
import Header from './components/Header'
import Footer from './components/Footer'
import Navbar from './components/Navbar'

// function
import { KEY_ROLE_TOKEN, localStorages, routers } from './utils'
import { setRole } from './redux/storeSlice'
import Loading from './components/Loading'

export default function App() {
  const dispatch = useDispatch()
  const isLoading = useSelector(state => state.isLoading)

  useEffect(() => {
    const token = localStorages.getToken()

    if (token) {
      const decoded = jwtDecode(token)
      dispatch(setRole(decoded[KEY_ROLE_TOKEN]))
      // dispatch(setUserId(decoded['UserId']))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const renderRoutes = () => {
    return routers.map((router, index) => (
      <Route key={index} path={router.path} element={router.element} />
    ))
  }

  return (
    <div className='relative'>
      <Header />
      <Navbar />
      <div className='min-h-[600px]'>
        <Routes>{renderRoutes()}</Routes>
      </div>
      <Footer />
      <Toaster position='top-right' reverseOrder={false} />
      {isLoading && <Loading />}
    </div>
  )
}
