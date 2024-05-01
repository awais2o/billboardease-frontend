import React, { useContext, useEffect, useState } from 'react'
import { useLoginMutation, useRegisterMutation } from '../../redux/GlobalApi'
import { Button, Form, Modal } from 'react-bootstrap'
import Cookies from 'js-cookie'
import toast from 'react-hot-toast'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import UserContext from '../../Context/UserContext'
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
  MDBCheckbox
} from 'mdb-react-ui-kit'

function Register ({ login }) {
  const { user, setUser } = useContext(UserContext)

  useEffect(() => {
    const token = Cookies.get('Authorization')
    if (token) {
      try {
        const decoded = jwtDecode(token)
        setUser(decoded.user_id)
      } catch (error) {
        console.error('Invalid token')
      }
    }
  }, [])
  const navigate = useNavigate() // Hook used here at the top level

  // useEffect(() => {
  //   if (user) {
  //     navigate('/admin')
  //   }
  // }, [user])
  const [input, setInput] = useState({ cnic: '', password: '' })
  const [doRegister, results] = useRegisterMutation()
  const [doLogin, loginResults] = useLoginMutation()
  const handleSubmit = e => {
    e.preventDefault()
    e.stopPropagation()

    !login ? doRegister({ input }) : doLogin({ input })
  }
  useEffect(() => {
    if (
      !loginResults?.isError &&
      !loginResults?.isLoading &&
      loginResults?.data
    ) {
      console.log('Response:', loginResults?.data)
      Cookies.set('Authorization', loginResults?.data?.token)
      const decoded = jwtDecode(loginResults?.data?.token)
      Cookies.set('user_id', decoded.user_id)
      localStorage.setItem('role', loginResults?.data?.role)

      navigate('/admin')
      toast.success('Register  Successfully', {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff'
        }
      })
    }
  }, [loginResults])
  useEffect(() => {
    if (results.isSuccess) {
      setInput()
      navigate('/login')
    }
    //  else {
    //   toast.success('Register  Fail', {
    //     style: {
    //       borderRadius: '10px',
    //       background: '#333',
    //       color: '#fff'
    //     }
    //   })
    // }
  }, [results])

  return (
    <MDBContainer fluid style={{ minHeight: '100vh' }}>
      <MDBCard className='text-black m-5' style={{ borderRadius: '25px' }}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol
              md='10'
              lg='6'
              className='order-2 order-lg-1 d-flex flex-column align-items-center'
            >
              <p className='text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4'>
                {!login ? ' Sign up' : 'Login'}
              </p>

              <Form onSubmit={handleSubmit}>
                <Form.Group controlId='cnic' className='mb-3'>
                  <Form.Label>Cnic</Form.Label>
                  <Form.Control
                    required
                    type='text'
                    value={input?.cnic || ''}
                    onChange={e => {
                      setInput({ ...input, cnic: e.target.value })
                    }}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId='cnic' className='mb-3'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    required
                    type='password'
                    value={input?.password || ''}
                    onChange={e => {
                      setInput({ ...input, password: e.target.value })
                    }}
                  ></Form.Control>
                </Form.Group>
                <Button className='mt-3' type='submit'>
                  {' '}
                  Register
                </Button>
              </Form>

              {/* <MDBBtn className='mb-4' size='lg'>
                Register
              </MDBBtn> */}
            </MDBCol>

            <MDBCol
              md='10'
              lg='6'
              className='order-1 order-lg-2 d-flex align-items-center'
            >
              <MDBCardImage
                src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp'
                fluid
              />
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  )
}

export default Register
