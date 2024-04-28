import React from 'react'
import { Container, Navbar, Nav, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {
  const nav = useNavigate()
  return (
    <>
      <Navbar collapseOnSelect expand='lg' className='bg-body-tertiary'>
        <Container>
          <Navbar.Brand href='#home'>BillboardEase</Navbar.Brand>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='me-auto'>
              <Nav.Link href='#features'>Features</Nav.Link>
              {/* Uncomment or add more Nav.Link or NavDropdown here as needed */}
            </Nav>
            <Nav>
              <Nav.Link
                className='me-3'
                onClick={() => {
                  nav('/register')
                }}
              >
                Admin
              </Nav.Link>
              <Nav.Link href='#login' as={Button}>
                Login/Signup
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Additional sections below the navbar */}
      <Container className='mt-4'>
        <section id='features'></section>
        <section id='about'>Hi</section>
        <section id='contact'>Hi</section>
      </Container>
    </>
  )
}

export default LandingPage
