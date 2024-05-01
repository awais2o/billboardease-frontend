import React from 'react'
import { Container, Navbar, Nav, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const MyNav = () => {
  const nav = useNavigate()
  return (
    <>
      <Navbar collapseOnSelect expand='lg' className='bg-body-tertiary'>
        <Container>
          <Navbar.Brand
            onClick={() => {
              nav('/admin')
            }}
          >
            BillboardEase
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
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
            </Nav>
            <Nav>
              <Nav.Link
                className='me-3'
                onClick={e => {
                  Cookies.remove('Authorization')
                  nav('/register')
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
