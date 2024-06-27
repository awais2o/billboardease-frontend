import React, { useEffect, useState } from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import {
  useUserprofileQuery,
  useUpdateuserprofileMutation
} from '../../redux/GlobalApi'
import MyNav from '../Admin/MyNav'
import Cookies from 'js-cookie'
import toast from 'react-hot-toast'

const Profile = () => {
  const user_id = Cookies.get('user_id')
  const { data, isLoading, error } = useUserprofileQuery(user_id)
  //   const [updateUserprofile] = useUpdateUserprofileMutation()
  const [update, results] = useUpdateuserprofileMutation()
  const [editable, setEditable] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cnic: '',
    phone_number: '',
    status: '',
    usertype_id: ''
  })

  React.useEffect(() => {
    if (data) {
      setFormData({
        name: data.name,
        email: data.email,
        cnic: data.cnic,
        phone_number: data.phone_number,
        status: data.status,
        usertype_id: data.usertype_id
      })
    }
  }, [data])
  useEffect(() => {
    if (results.isError) {
      alert(results.error.data.error)
    }
    if (results.isSuccess) {
      toast.success('Update Successfully', {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff'
        }
      })
    }
  }, [results])

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    update({ user_id, ...formData })
    setEditable(false) // Disable edit mode after submitting
  }

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error loading profile data</p>

  return (
    <>
      <MyNav />
      <Container>
        <Row className='justify-content-center'>
          <Col md={8}>
            <h2>User Profile</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId='formName'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type='text'
                  name='name'
                  required
                  placeholder='John Doe'
                  value={formData.name}
                  onChange={handleChange}
                  readOnly={!editable}
                />
              </Form.Group>
              <Form.Group controlId='formEmail'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type='email'
                  name='email'
                  required
                  placeholder='johndoe@gmail.com'
                  value={formData.email}
                  onChange={handleChange}
                  readOnly={!editable}
                />
              </Form.Group>
              <Form.Group controlId='formCnic'>
                <Form.Label>CNIC</Form.Label>
                <Form.Control
                  type='text'
                  name='cnic'
                  required
                  pattern='\d{13}'
                  placeholder='35201XXXXXXXX'
                  value={formData.cnic}
                  onChange={handleChange}
                  readOnly={!editable}
                />
              </Form.Group>
              <Form.Group controlId='formPhoneNumber'>
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type='text'
                  name='phone_number'
                  pattern='\d{11}'
                  required
                  placeholder='03XXXXXXXXX'
                  value={formData.phone_number}
                  onChange={handleChange}
                  readOnly={!editable}
                />
              </Form.Group>
              <Form.Group controlId='formStatus'>
                <Form.Label>Status</Form.Label>
                <Form.Control
                  type='text'
                  name='status'
                  value={formData.status}
                  onChange={handleChange}
                  readOnly={!editable}
                />
              </Form.Group>
              <Form.Group controlId='formUsertypeId'>
                <Form.Label>User Type ID</Form.Label>
                <Form.Control
                  type='text'
                  name='usertype_id'
                  value={formData.usertype_id}
                  onChange={handleChange}
                  readOnly={!editable}
                />
              </Form.Group>
              <Button
                variant='primary'
                className='mt-2'
                onClick={() => setEditable(!editable)}
              >
                {editable ? 'Cancel' : 'Edit'}
              </Button>
              {editable && (
                <Button variant='success' type='submit' className='ms-2 mt-2'>
                  Update
                </Button>
              )}
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Profile
