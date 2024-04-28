import React, { useState } from 'react'
import Register from './Component/Auth/Register'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import LandingPage from './Component/LandingPage'
import UserContext from './Context/UserContext'
import Home from './Component/Admin/Home'
import Billlboards from './Component/Admin/Billboards'
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
            <Route path='/admin' element={<Home />} />
            <Route path='/billboard' element={<Billlboards />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  )
}

export default App
