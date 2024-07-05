import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import Select from 'react-select'
import {
  usePostBillboardMutation,
  useUpdateBillboardMutation
} from '../../../redux/GlobalApi'
import toast, { LoaderIcon } from 'react-hot-toast'
import Cookies from 'js-cookie'

import axios from 'axios'
const baseUrl = process.env.REACT_APP_API_URL

const AddBillboard = ({ display, setDisplay, tags, data, update }) => {
  const authtoken = Cookies.get('Authorization')

  console.log({ data })
  const [formData, setFormData] = useState({})
  const [isUploading, setIsUploading] = useState(false)

  useEffect(() => {
    if (data && update) {
      setFormData(data)
    }
  }, [data])

  useEffect(() => {
    console.log({ formData })
  }, [formData])

  const [addBillboard, results] = usePostBillboardMutation()
  const [updateBillboard, updateResults] = useUpdateBillboardMutation()

  const handleChange = e => {
    const { name, value, type } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'radio' ? parseInt(value, 10) : value
    }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log(formData)
    if (!update) {
      addBillboard({ input: formData })
    } else {
      const { billboard_id, ...newBillboard } = formData
      updateBillboard({ input: newBillboard, id: billboard_id })
    }
  }

  useEffect(() => {
    if (results.isSuccess) {
      toast.success('Billboard Added Successfully', {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff'
        }
      })
      setDisplay(false)
    }
    if (updateResults.isSuccess) {
      toast.success('Billboard Updated Successfully', {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff'
        }
      })
      setDisplay(false)
    }
  }, [updateResults, results])

  const tagOptions = tags?.tags?.map(tag => ({
    value: tag?.tag_id,
    label: tag?.tag_name
  }))

  const handleFileChange = async event => {
    const file = event.target.files[0]
    const formData = new FormData()
    formData.append('file', file)
    setIsUploading(true)

    try {
      const response = await axios.post(
        `${baseUrl}/media/uploadfile`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: authtoken
          }
        }
      )

      console.log('File uploaded successfully:', response.data)
      setFormData(formdata => ({
        ...formdata,
        image: response?.data?.url
      }))
    } catch (error) {
      console.error('Error uploading file:', error)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <>
      <Modal
        show={display}
        onHide={() => {
          setDisplay(false)
        }}
        backdrop='static'
        keyboard={false}
        className='w-10'
      >
        <Modal.Header closeButton className=''>
          <Modal.Title as='h5'>
            {!update ? 'Add Billboard' : 'Update Billboard'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col>
                <Form onSubmit={handleSubmit}>
                  <Form.Group as={Col} className='mb-3' controlId='title'>
                    <Form.Label>Title</Form.Label>
                    <Col sm='10'>
                      <Form.Control
                        required
                        type='text'
                        pattern='[a-zA-Z].*'
                        name='title'
                        value={formData.title}
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback type='invalid'>
                        Please enter a title starting with text.
                      </Form.Control.Feedback>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Col} className='mb-3' controlId='baseprice'>
                    <Form.Label>Base Price</Form.Label>
                    <Col sm='10'>
                      <Form.Control
                        required
                        type='number'
                        name='baseprice'
                        value={formData.baseprice}
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback type='invalid'>
                        Please enter a valid base price.
                      </Form.Control.Feedback>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Col} className='mb-3' controlId='quantity'>
                    <Form.Label>Quantity (Series)</Form.Label>
                    <Col sm='10'>
                      <Form.Control
                        required
                        type='number'
                        name='quantity'
                        value={formData.quantity}
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback type='invalid'>
                        Please enter a valid quantity.
                      </Form.Control.Feedback>
                    </Col>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    className='mb-3'
                    controlId='location_address'
                  >
                    <Form.Label>Location Address</Form.Label>
                    <Col sm='10'>
                      <Form.Control
                        required
                        type='text'
                        name='location_address'
                        value={formData.location_address}
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback type='invalid'>
                        Please enter a valid location address.
                      </Form.Control.Feedback>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Col} className='mb-3' controlId='longitude'>
                    <Form.Label>Longitude</Form.Label>
                    <Col sm='10'>
                      <Form.Control
                        required
                        type='number'
                        pattern='-?\d*\.?\d+'
                        name='longitude'
                        value={formData.longitude}
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback type='invalid'>
                        Please enter a valid longitude.
                      </Form.Control.Feedback>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Col} className='mb-3' controlId='latitude'>
                    <Form.Label>Latitude</Form.Label>
                    <Col sm='10'>
                      <Form.Control
                        required
                        type='number'
                        pattern='-?\d*\.?\d+'
                        name='latitude'
                        value={formData.latitude}
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback type='invalid'>
                        Please enter a valid latitude.
                      </Form.Control.Feedback>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Col} className='mb-3' controlId='dimension_x'>
                    <Form.Label>Dimension X (ft)</Form.Label>
                    <Col sm='10'>
                      <Form.Control
                        required
                        type='number'
                        pattern='\d+'
                        name='dimension_x'
                        value={formData.dimension_x}
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback type='invalid'>
                        Please enter a valid dimension X.
                      </Form.Control.Feedback>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Col} className='mb-3' controlId='dimension_y'>
                    <Form.Label>Dimension Y (ft)</Form.Label>
                    <Col sm='10'>
                      <Form.Control
                        required
                        type='number'
                        pattern='\d+'
                        name='dimension_y'
                        value={formData.dimension_y}
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback type='invalid'>
                        Please enter a valid dimension Y.
                      </Form.Control.Feedback>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Col} className='mb-3' controlId='regular'>
                    <Form.Label>Billboard Type</Form.Label>
                    <Col sm='10'>
                      <Form.Check
                        type='radio'
                        label='Regular Billboard'
                        name='regular'
                        value={1}
                        checked={formData.regular === 1}
                        onChange={handleChange}
                        required
                      />
                      <Form.Check
                        type='radio'
                        label='Bidable Billboard'
                        name='regular'
                        value={0}
                        checked={formData.regular === 0}
                        onChange={handleChange}
                        required
                      />
                      <Form.Control.Feedback type='invalid'>
                        Please select a value for billboard type.
                      </Form.Control.Feedback>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Col} className='mb-3' controlId='tag_id'>
                    <Form.Label>Tag</Form.Label>
                    <Col sm='10'>
                      <Select
                        options={tagOptions}
                        value={tagOptions?.find(
                          option => option.value === formData.tag_id
                        )}
                        onChange={option =>
                          handleChange({
                            target: { name: 'tag_id', value: option.value }
                          })
                        }
                        isSearchable
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group controlId='formFile' className='mb-3'>
                    <Form.Label>Select File</Form.Label>
                    <Form.Control
                      type='file'
                      accept='image/*'
                      onChange={handleFileChange}
                    />
                  </Form.Group>
                  {!update ? (
                    <Button
                      disabled={results.isLoading || isUploading}
                      type='submit'
                    >
                      Add
                    </Button>
                  ) : (
                    <Button
                      disabled={results.isLoading || isUploading}
                      type='submit'
                    >
                      Update
                    </Button>
                  )}
                </Form>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default AddBillboard
