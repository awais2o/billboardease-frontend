import React from 'react'
import { Modal } from 'react-bootstrap'
import { useGetImageQuery } from '../../../redux/GlobalApi'

const ImagePopup = ({ display, setDisplay, image }) => {
  const { data, isError, status } = useGetImageQuery({ image })
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
        <Modal.Header closeButton className=''></Modal.Header>{' '}
        <Modal.Body>
          <img
            placeholder='No Image'
            src={!isError ? data?.imageURL : 'https://placehold.co/600x400'}
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain'
            }} // Add this style
          />
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ImagePopup
