import React, { useEffect, useState } from 'react'
import { useRegisterMutation } from '../../redux/GlobalApi'
import { Button, Form, Modal } from 'react-bootstrap'
import Cookies from 'js-cookie'
import toast from 'react-hot-toast'

const Register = () => {
  const [input, setInput] = useState({ cnic: '', password: '' })
  const [doRegister, results] = useRegisterMutation()
  const handleSubmit = e => {
    e.preventDefault()
    e.stopPropagation()

    doRegister({ input })
  }
  useEffect(() => {
    if (!results?.isError && !results?.isLoading && results?.data) {
      console.log('Response:', results?.data)
      Cookies.set('Authorization', results?.data?.token)
      toast.success('REgister  Successfully', {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff'
        }
      })
    }
  }, [results])

  return (
    <>
      <Modal show={true}>
        <Modal.Header>Register to BillboardEase</Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId='cnic'>
              <Form.Label>Cnic</Form.Label>
              <Form.Control
                required
                type='text'
                onChange={e => {
                  setInput({ ...input, cnic: e.target.value })
                }}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='cnic'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type='password'
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
        </Modal.Body>
      </Modal>
    </>
  )
}

export default Register
