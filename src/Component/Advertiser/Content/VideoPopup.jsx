import React from 'react'
import { Modal } from 'react-bootstrap'
import { useGetImageQuery } from '../../../redux/GlobalApi'

const VideoPopup = ({ display, setDisplay, image }) => {
  console.log(image)
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
          <video
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain'
            }}
            controls // Allows the user to control video playback, including volume, seeking, and pause/play.
          >
            <source
              src={!isError ? data?.imageURL : 'https://placehold.co/600x400'}
              type='video/mp4'
            />
            Your browser does not support the video tag.
          </video>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default VideoPopup
