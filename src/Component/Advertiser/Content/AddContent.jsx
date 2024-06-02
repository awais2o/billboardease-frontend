import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import Select from 'react-select'
import {
  useAddMyContentMutation,
  useUpdateMyContentMutation
} from '../../../redux/GlobalApi'
import toast, { LoaderIcon } from 'react-hot-toast'
import Cookies from 'js-cookie'

import axios from 'axios'
const baseUrl = process.env.REACT_APP_API_URL

const AddContent = ({ display, setDisplay, data, update }) => {
  const authtoken = Cookies.get('Authorization')

  console.log({ data })
  const [formData, setFormData] = useState({})
  useEffect(() => {
    if (data && update) {
      setFormData(data)
    }
  }, [data])
  useEffect(() => {
    console.log({ formData })
  }, [formData])
  useEffect(() => {
    console.log(formData)
  }, [formData])
  const [addContent, results] = useAddMyContentMutation()
  const [updateContent, updateResults] = useUpdateMyContentMutation()
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
      addContent({ input: formData })
    } else {
      const { content_id, ...newContent } = formData
      updateContent({ input: newContent, id: content_id })
    }
  }
  useEffect(() => {
    if (results.isSuccess) {
      toast.success('Content Added  Successfully', {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff'
        }
      })
      setDisplay(false)
    }
    if (updateResults.isSuccess) {
      toast.success('Content Update  Successfully', {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff'
        }
      })
      setDisplay(false)
    }
  }, [updateResults, results])

  const [selectedFile, setSelectedFile] = useState(null)

  // Function to handle file change
  const handleFileChange = async event => {
    const file = event.target.files[0] // Get the selected file
    console.log(file)
    // Create formData object to send file data
    const formData = new FormData()
    formData.append('file', file)

    try {
      // Make API call to upload the file
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
      setFormData(formdata => {
        return {
          ...formdata,
          filepath: response?.data?.url
        }
      })
      // Do something with the response if needed
    } catch (error) {
      console.error('Error uploading file:', error)
      // Handle error
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
            {!update ? 'Add Content' : 'Update Content'}
            {/* {operateId ? 'Update Asset' : 'Add Asset'}{' '} */}
          </Modal.Title>
        </Modal.Header>{' '}
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
                  <Form.Group as={Col} className='mb-3' controlId='description'>
                    <Form.Label>Description</Form.Label>
                    <Col sm='10'>
                      <Form.Control
                        required
                        type='textarea'
                        pattern='[a-zA-Z].*' // Starts with text
                        name='description'
                        value={formData.description}
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback type='invalid'>
                        Please enter a title starting with text.
                      </Form.Control.Feedback>
                    </Col>
                  </Form.Group>

                  <Form.Group controlId='formFile' className='mb-3'>
                    <Form.Label>Select File</Form.Label>
                    <Form.Control
                      type='file'
                      accept='video/*'
                      onChange={handleFileChange}
                    />
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

export default AddContent
