import React, { useState } from 'react'
import Register from './Component/Auth/Register'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import LandingPage from './Component/LandingPage'
import UserContext from './Context/UserContext'
import Home from './Component/Admin/Home'
import Billboards from './Component/Admin/Billboard/Billboards'
import Cookies from 'js-cookie'
import AllUsers from './Component/Admin/AllUsers/AllUsers'
import Advertise from './Component/Advertiser/Advertise'
import Content from './Component/Advertiser/Content/Content'
import ProceedingPage from './Component/Advertiser/Proceeding/ProceedingPage'
import ApproveContent from './Component/Admin/ApproveContent'
import PaymentPage from './Component/Advertiser/PaymentPage'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Profile from './Component/Advertiser/Profile'
import Tags from './Component/Admin/Tags/Tags'
const App = () => {
  const [user, setUser] = useState(null)
  const [role, setRole] = useState(null)

  return (
    <>
      <Toaster />
      <UserContext.Provider value={{ user, setUser, role, setRole }}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route
              path='/admin'
              element={
                <ProtectedRoute roleRequired={1}>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path='/billboard'
              element={
                <ProtectedRoute roleRequired={1}>
                  <Billboards />
                </ProtectedRoute>
              }
            />

<Route
              path='/tags'
              element={
                <ProtectedRoute roleRequired={1}>
                  <Tags />
                </ProtectedRoute>
              }
            />

            <Route
              path='/approve-content'
              element={
                <ProtectedRoute roleRequired={1}>
                  <ApproveContent />
                </ProtectedRoute>
              }
            />
            <Route
              path='/allusers'
              element={
                <ProtectedRoute roleRequired={1}>
                  <AllUsers />
                </ProtectedRoute>
              }
            />
            <Route
              path='/advertise'
              element={
                <ProtectedRoute roleRequired={2}>
                  <Advertise />
                </ProtectedRoute>
              }
            />
            <Route
              path='/proceed'
              element={
                <ProtectedRoute roleRequired={2}>
                  <ProceedingPage />
                </ProtectedRoute>
              }
            />
            <Route
              path='/payment'
              element={
                <ProtectedRoute roleRequired={2}>
                  <PaymentPage />
                </ProtectedRoute>
              }
            />
            <Route
              path='/profile'
              element={
                <ProtectedRoute roleRequired={2}>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path='/adminProfile'
              element={
                <ProtectedRoute roleRequired={1}>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path='/content'
              element={
                <ProtectedRoute roleRequired={2}>
                  <Content />
                </ProtectedRoute>
              }
            />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Register login={true} />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  )
}

const ProtectedRoute = ({ children, roleRequired }) => {
  const navigate = useNavigate()
  const token = Cookies.get('Authorization')
  const storedRole = localStorage.getItem('role')

  React.useEffect(() => {
    if (!token || +storedRole !== roleRequired) {
      console.log({ token, storedRole: +storedRole, roleRequired })
      navigate('/login')
    }
  }, [token, storedRole, roleRequired, navigate])

  return token && +storedRole === roleRequired ? children : null
}

export default App
