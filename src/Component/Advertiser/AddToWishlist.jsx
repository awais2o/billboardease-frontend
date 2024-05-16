import React, { useState } from 'react'
import { Button, Form, Modal, Alert } from 'react-bootstrap'
import {
  useAddtoWishlistMutation,
  useWishlistQuery
} from '../../redux/GlobalApi'

const AddToWishlist = ({ data, display, setDisplay }) => {
  const [wish, { isLoading }] = useAddtoWishlistMutation()
  const [date, setDate] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    const minutes = new Date(date).getMinutes()
    if ((minutes === 0 || minutes === 30) && data?.billboard_id) {
      wish({ id: data.billboard_id, date: date })
      setError('')
      setDisplay(false)
    } else {
      setError('Please ensure the time is on the hour or half past the hour.')
    }
  }

  const handleDateChange = e => {
    const value = e.target.value
    const minutes = new Date(value).getMinutes()
    console.log({ minutes })
    if (minutes === 0 || minutes === 30) {
      setDate(value)
      setError('')
    } else {
      setError(
        'Please select a time that is either on the hour or half past the hour.'
      )
    }
  }

  const calculateMinDate = () => {
    const today = new Date()
    today.setDate(today.getDate() + 3)
    return today.toISOString().split('T')[0]
  }

  return (
    <Modal
      show={display}
      onHide={() => setDisplay(false)}
      backdrop='static'
      keyboard={false}
      className='w-10'
    >
      <Modal.Header closeButton>
        <Modal.Title>Wish For Date</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId='wishdate'>
            <Form.Label>Date</Form.Label>
            <Form.Control
              type='datetime-local'
              step='1800'
              value={date}
              onChange={handleDateChange}
              min={calculateMinDate()} // Ensures date is at least three days in the future
            />
          </Form.Group>
          {error ? (
            <Alert variant='danger'>{error}</Alert>
          ) : (
            <Button className='mt-3' type='submit' disabled={isLoading}>
              Add to Your Wishlist
            </Button>
          )}
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default AddToWishlist
