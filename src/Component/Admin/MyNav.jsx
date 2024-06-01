import React from 'react'
import { Container, Navbar, Nav, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const MyNav = () => {
  const nav = useNavigate()
  const role = localStorage.getItem('role')
  console.log({ role })
  return (
    <>
      <Navbar collapseOnSelect expand='lg' className='bg-body-tertiary'>
        <Container>
          <Navbar.Brand
            onClick={() => {
              ;+role === 1 ? nav('/admin') : nav('/advertise')
            }}
          >
            BillboardEase
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            {+role === 1 ? (
              <Nav className='me-auto'>
                <Nav.Link
                  onClick={() => {
                    nav('/billboard')
                  }}
                >
                  Billboards
                </Nav.Link>
                <Nav.Link
                  onClick={() => {
                    nav('/allusers')
                  }}
                >
                  All User
                </Nav.Link>

                <Nav.Link
                  onClick={() => {
                    nav('/approve-content')
                  }}
                >
                  Approve
                </Nav.Link>
              </Nav>
            ) : +role === 2 ? (
              <>
                <Nav className='me-auto'>
                  <Nav.Link
                    onClick={() => {
                      nav('/content')
                    }}
                  >
                    My Content
                  </Nav.Link>
                  <Nav.Link
                    onClick={() => {
                      nav('/proceed')
                    }}
                  >
                    Proceeding
                  </Nav.Link>
                  <Nav.Link
                    onClick={() => {
                      nav('/payment')
                    }}
                  >
                    Pending Payment
                  </Nav.Link>
                  <Nav.Link
                    onClick={() => {
                      nav('/advertise')
                    }}
                  >
                    Profile
                  </Nav.Link>
                </Nav>
              </>
            ) : (
              <></>
            )}
            <Nav>
              <Nav.Link
                className='me-3'
                onClick={e => {
                  Cookies.remove('Authorization')
                  localStorage.removeItem('role')
                  nav('/login')
                }}
              >
                Signout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default MyNav
