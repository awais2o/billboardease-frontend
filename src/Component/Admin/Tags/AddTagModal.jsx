import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
// import { useCreateTagMutation } from '../../../redux/GlobalApi'
import Swal from 'sweetalert2'
import { useCreateTagsMutation } from '../../../redux/GlobalApi'

const AddTagModal = ({ show, handleClose, refetch }) => {
  const [tagName, setTagName] = useState('')
  const [createTag, { isLoading }] = useCreateTagsMutation()

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await createTag({ tag_name: tagName })
      Swal.fire({
        title: 'Success',
        text: 'Tag added successfully',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
      })
      setTagName('')
      handleClose()
      refetch() // Refetch tags after adding
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Failed to add tag',
        icon: 'error',
        timer: 2000,
        showConfirmButton: false
      })
    }
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Tag</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Tag Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter tag name'
              value={tagName}
              onChange={e => setTagName(e.target.value)}
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' type='submit' disabled={isLoading}>
            {isLoading ? 'Adding...' : 'Add Tag'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default AddTagModal
