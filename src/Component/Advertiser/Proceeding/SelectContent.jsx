import React, { useState } from 'react'
import Select from 'react-select'
import { Button, Form, Modal } from 'react-bootstrap'
import {
  useAttachContentMutation,
  useMyContentQuery
} from '../../../redux/GlobalApi'
import { useNavigate } from 'react-router-dom'
import AddContent from '../Content/AddContent'

const SelectContent = ({ display, setDisplay, operate }) => {
  const nav = useNavigate()
  const { data, isLoading, error, isError, refetch } = useMyContentQuery()
  const [attach, attachResults] = useAttachContentMutation()

  // State for managing the selected content ID
  const [selectedContent, setSelectedContent] = useState(null)
  const [addnew, setAddnew] = useState(false)

  // Handle change in select input
  const handleSelectChange = selectedOption => {
    setSelectedContent(selectedOption)
  }

  // Prepare options for react-select
  const options = data?.map(content => ({
    value: content?.content_id,
    label: `${content?.title} - ${content?.description}`
  }))
  return (
    <>
      <Modal
        show={display}
        onHide={() => setDisplay(false)}
        backdrop='static'
        keyboard={false}
        size='lg' // Adjust modal size as needed
      >
        <Modal.Header closeButton>Select Your Content</Modal.Header>
        <Modal.Body>
          <div className='d-flex justify-content-end '>
            {' '}
            {/* Added margin-top for spacing */}
            {/* <Button
              variant='link' // Makes the button look like a link
              onClick={() => {
                setAddnew(true) // Your existing logic
              }}
              style={{
                textDecoration: 'underline',
                color: 'blue',
                boxShadow: 'none',
                backgroundColor: 'transparent',
                border: 'none'
              }}
            >
              Add New Content
            </Button> */}
            <Button
              variant='secondary'
              onClick={() => {
                setAddnew(true) // Assuming setAddnew is a state setter for controlling some view logic
              }}
            >
              Add New Content
            </Button>
          </div>

          <Form>
            <Form.Group>
              <Form.Label>Select Content</Form.Label>
              <Select
                value={selectedContent}
                onChange={handleSelectChange}
                options={options}
                className='basic-single'
                classNamePrefix='select'
                isClearable={true}
                isSearchable={true}
              />
            </Form.Group>
            <Button
              className='mt-3'
              onClick={() => {
                attach({
                  bid_id: operate.bid_id,
                  content_id: selectedContent?.value
                })
                setDisplay(false)
              }}
            >
              {' '}
              Request Approval
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      {addnew && (
        <>
          {' '}
          <AddContent display={display} setDisplay={setDisplay}></AddContent>
        </>
      )}
    </>
  )
}

export default SelectContent
