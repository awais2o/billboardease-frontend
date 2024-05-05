import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import {
  useAddtoWishlistMutation,
  useWishlistQuery
} from '../../redux/GlobalApi'

const AddToWishlist = ({ data, display, setDisplay }) => {
  const [wish, wished] = useAddtoWishlistMutation()
  const hi = useWishlistQuery()
  const [date, setDate] = useState('') // State to hold the date value

  const handleSubmit = e => {
    e.preventDefault()
    // Ensure you are calling the `wish` function correctly with the date from state
    if (data?.billboard_id && date) {
      wish({ id: data.billboard_id, date: date })
    } else {
      console.error('Missing billboard ID or date')
    }
    setDisplay(false)
  }

  const handleDateChange = e => {
    setDate(e.target.value) // Update the date state on change
  }
  const today = new Date()
  // Add 3 days to today's date
  const threeDaysLater = new Date(today.setDate(today.getDate() + 3))
  // Format the date as yyyy-mm-dd
  const minDate = threeDaysLater.toISOString().split('T')[0]
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
              type='date'
              value={date}
              onChange={handleDateChange}
              min={minDate} // Ensures date is at least three days in the future
            />
          </Form.Group>
          <Button className='mt-3' type='submit'>
            Add to Your Wishlist
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default AddToWishlist
