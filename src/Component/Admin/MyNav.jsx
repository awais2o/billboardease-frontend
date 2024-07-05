import React from 'react'
import {
  Container,
  Navbar,
  Nav,
  Button,
  Tooltip,
  OverlayTrigger
} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import Cookies from 'js-cookie'

const MyNav = () => {
  const nav = useNavigate()
  const role = localStorage.getItem('role')
  console.log({ role })
  return (
    <>
      <Navbar
        collapseOnSelect
        expand='lg'
        className='bg-body-tertiary navbar-wave '
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1000
          // backgroundColor: 'black',
          // color: 'white'
          // backgroundColor: #0000
        }}
      >
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
                  as={NavLink}
                  to='/billboard'
                  activeClassName='active-link'
                >
                  Billboards
                </Nav.Link>

                <Nav.Link as={NavLink} to='/tags' activeClassName='active-link'>
                  Tags
                </Nav.Link>

                <Nav.Link
                  as={NavLink}
                  to='/allusers'
                  activeClassName='active-link'
                >
                  All Users
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  to='/approve-content'
                  activeClassName='active-link'
                >
                  Approve
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  to='/adminProfile'
                  activeClassName='active-link'
                >
                  Profile
                </Nav.Link>
              </Nav>
            ) : +role === 2 ? (
              <Nav className='me-auto'>
                <Nav.Link
                  as={NavLink}
                  to='/content'
                  activeClassName='active-link'
                >
                  My Content
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  to='/proceed'
                  activeClassName='active-link'
                >
                  Proceeding
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  to='/payment'
                  activeClassName='active-link'
                >
                  Pending Payment
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  to='/profile'
                  activeClassName='active-link'
                >
                  Profile
                </Nav.Link>
              </Nav>
            ) : (
              <></>
            )}
            <Nav>
              <OverlayTrigger
                placement='bottom'
                overlay={<Tooltip id='tooltip'>Signout</Tooltip>}
              >
                <Nav.Link
                  className='me-3 custom-hover btn p-2'
                  onClick={e => {
                    Cookies.remove('Authorization')
                    localStorage.removeItem('role')
                    nav('/login')
                  }}
                >
                  Signout
                </Nav.Link>
              </OverlayTrigger>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default MyNav
