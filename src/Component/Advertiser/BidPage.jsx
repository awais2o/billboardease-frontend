import React, { useState, useEffect } from 'react'
import { Form, Modal, Button } from 'react-bootstrap'
import io from 'socket.io-client'

// Establish a connection to the server
const socket = io('http://localhost:5001') // Adjust the URL to match your server

export const BidPage = ({ billboard, display, setDisplay }) => {
  const getDefaultDateTime = () => {
    let now = new Date()
    let minutes = now.getMinutes()
    if (minutes >= 30) {
      now.setMinutes(30)
    } else {
      now.setMinutes(0)
    }
    now.setSeconds(0, 0)
    now.setDate(now.getDate() + 2)
    return now.toISOString().slice(0, 16)
  }

  const [forDateTime, setForDateTime] = useState(getDefaultDateTime())
  const [bid, setBid] = useState(billboard?.baseprice)

  useEffect(() => {
    setForDateTime(getDefaultDateTime())

    // Listen for bid updates from the server
    socket.on('bid', newBid => {
      console.log('New bid received:', newBid)
      // Implement any additional logic to handle incoming bids
    })

    // Clean up the effect
    return () => socket.off('bid')
  }, [])

  const handleBidSubmit = () => {
    // Emit the bid to the server
    socket.emit('bid', {
      bid: bid,
      dateTime: forDateTime,
      billboardId: billboard?.id
    })
    console.log('Bid submitted for:', forDateTime)
    setDisplay(false)
  }

  return (
    <Modal show={display} onHide={() => setDisplay(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Place Your Bid</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={e => e.preventDefault()}>
          <Form.Group>
            <Form.Label>Your Bid</Form.Label>
            <Form.Control
              type='number'
              value={bid}
              onChange={e => setBid(e.target.value)}
            />
          </Form.Group>

          <Button variant='primary' onClick={handleBidSubmit}>
            Submit Bid
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}
