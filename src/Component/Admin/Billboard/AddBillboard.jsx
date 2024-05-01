import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import Select from 'react-select'
import {
  usePostBillboardMutation,
  useUpdateBillboardMutation
} from '../../../redux/GlobalApi'
import toast, { LoaderIcon } from 'react-hot-toast'

const AddBillboard = ({ display, setDisplay, tags, data, update }) => {
  console.log({ data })
  const [formData, setFormData] = useState({})
  useEffect(() => {
    if (data && update) {
      setFormData(data)
    }
  }, [data])
  useEffect(() => {
    console.log(formData)
  }, [formData])
  const [addBillboard, results] = usePostBillboardMutation()
  const [updateBillboard, updateResults] = useUpdateBillboardMutation()
  const handleChange = e => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    // Add your submit logic here, e.g., sending data to the server
    console.log(formData)
    //
    if (!update) {
      addBillboard({ input: formData })
    } else {
      const { billboard_id, ...newBillboard } = formData
      updateBillboard({ input: newBillboard, id: billboard_id })
    }
  }
  useEffect(() => {
    if (results.isSuccess) {
      toast.success('Billlboard Added  Successfully', {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff'
        }
      })
      setDisplay(false)
    }
    if (updateResults.isSuccess) {
      toast.success('Billlboard Update  Successfully', {
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
            {/* {operateId ? 'Update Asset' : 'Add Asset'}{' '} */}
          </Modal.Title>
        </Modal.Header>{' '}
        <Modal.Body>
          <Container>
            <Row>
              <Col>
                <Form onSubmit={handleSubmit}>
                  <Form.Group as={Col} controlId='title'>
                    <Form.Label>Title</Form.Label>
                    <Col sm='10'>
                      <Form.Control
                        required
                        type='text'
                        pattern='[a-zA-Z].*' // Starts with text
                        name='title'
                        value={formData.title}
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback type='invalid'>
                        Please enter a title starting with text.
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
                        pattern='-?\d*\.?\d+' // Number pattern
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
                        pattern='-?\d*\.?\d+' // Number pattern
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
                    <Form.Label>Dimension X</Form.Label>
                    <Col sm='10'>
                      <Form.Control
                        required
                        type='number'
                        pattern='\d+' // Positive integer pattern
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
                    <Form.Label>Dimension Y</Form.Label>
                    <Col sm='10'>
                      <Form.Control
                        required
                        type='number'
                        pattern='\d+' // Positive integer pattern
                        name='dimension_y'
                        value={formData.dimension_y}
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback type='invalid'>
                        Please enter a valid dimension Y.
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
                  {!update ? (
                    <Button disabled={results.isLoading} type='submit'>
                      Add
                    </Button>
                  ) : (
                    <Button disabled={results.isLoading} type='submit'>
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
