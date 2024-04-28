import React, { useEffect } from 'react'
import MyNav from './MyNav'
import { Outlet, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
const Home = () => {
  const nav = useNavigate()
  useEffect(() => {
    const token = Cookies.get('user_id')
    if (!token) {
      nav('register')
    }
  }, [])
  return (
    <>
      <MyNav />
      <section>Home</section>
    </>
  )
}

export default Home
