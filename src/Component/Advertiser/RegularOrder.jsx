import React, { useContext, useEffect, useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { useOrderMutation } from '../../redux/GlobalApi'
import UserContext from '../../Context/UserContext'
import Cookies from 'js-cookie'
import HighlightedCalendar from './HighlightedCalendar'

const RegularOrder = ({ billboard, display, setDisplay }) => {
  const { user } = useContext(UserContext)
  const user_id = Cookies.get('user_id') || user // Assuming user_id is stored in a cookie

  const [forDateTime, setForDateTime] = useState('')
  const [toDate, setToDate] = useState('')
  const [order, results] = useOrderMutation()
  const today = new Date()
  const minForDateTime = new Date(today.setDate(today.getDate() + 2))
    .toISOString()
    .split('T')[0]

  const handleForDateTimeChange = e => {
    setForDateTime(e.target.value)
    setToDate('') // Reset toDate when forDateTime changes
  }
  useEffect(() => {
    if (results.isSuccess) {
      setDisplay(false)
    } else if (results.isError) {
      alert(results?.error?.data?.message)
    }
  }, [results])
  return (
    <>
      <Modal show={display} onHide={() => setDisplay(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{billboard.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={e => {
              e.preventDefault()
              order({
                forDateTime,
                toDate,
                billboard_id: billboard.billboard_id,
                user_id,
                bid: billboard.baseprice
              })
            }}
          >
            <Form.Group className='mb-3' controlId='forDateTime'>
              <Form.Label>From Date</Form.Label>
              <Form.Control
                type='date'
                name='forDateTime'
                value={forDateTime}
                min={minForDateTime}
                onChange={handleForDateTimeChange}
                required
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='toDate'>
              <Form.Label>To Date</Form.Label>
              <Form.Control
                required
                type='date'
                name='toDate'
                value={toDate}
                min={forDateTime}
                onChange={e => setToDate(e.target.value)}
                disabled={!forDateTime}
              />
            </Form.Group>
            <Button
              className='button btn-light border border-dark custom-hover'
              type='submit'
            >
              Book
            </Button>
            {results.isError && results.error?.data?.availableDates.length > 0 && (
              <div>
                <h1>Available Dates</h1>
                <HighlightedCalendar
                  highlightedDates={results?.error?.data?.availableDates}
                />
              </div>
            )}
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default RegularOrder
