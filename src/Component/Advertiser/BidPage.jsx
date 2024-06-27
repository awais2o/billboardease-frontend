// import React, { useState, useEffect, useContext } from 'react'
// import { Form, Modal, Button } from 'react-bootstrap'
// import axios from 'axios'
// import io from 'socket.io-client'
// import Cookies from 'js-cookie'
// import { formatDate } from '../../utils/DateFormat'
// import UserContext from '../../Context/UserContext'

// const socket = io(process.env.REACT_APP_API_URL, {
//   reconnectionAttempts: 5, // Retry 5 times
//   timeout: 5000 // Wait 5 seconds before timing out
// })

// export const BidPage = ({ billboard, display, setDisplay }) => {
//   const { user } = useContext(UserContext)
//   const user_id = Cookies.get('user_id') || user // Assuming user_id is stored in a cookie

//   const getDefaultDateTime = () => {
//     let now = new Date()

//     // Add two days to the current date
//     now.setDate(now.getDate() + 2)

//     // Adjust minutes to either 00 or 30
//     const minutes = now.getMinutes()
//     if (minutes < 30) {
//       now.setMinutes(0)
//     } else {
//       now.setMinutes(30)
//     }
//     now.setSeconds(0, 0) // Reset seconds and milliseconds

//     // Format the date in local timezone manually
//     const offset = now.getTimezoneOffset() * 60000 // offset in milliseconds
//     const localISOTime = new Date(now - offset).toISOString().slice(0, 16)

//     return localISOTime
//   }

//   const [forDateTime, setForDateTime] = useState(getDefaultDateTime())
//   const [bid, setBid] = useState(billboard?.baseprice || 0)
//   const [value, setValue] = useState((billboard?.baseprice || 0) + 500)
//   const [lastBidTime, setLastBidTime] = useState(null) // Initialize as null
//   const [canBid, setCanBid] = useState(true) // Initialize as true
//   const [countdown, setCountdown] = useState(60) // 60 seconds countdown
//   const [isSocketConnected, setIsSocketConnected] = useState(false) // Track socket connection status

//   useEffect(() => {
//     const roomName = `${billboard.billboard_id}_${forDateTime}`
//     console.log(`Joining room: ${roomName}`)
//     socket.emit('joinRoom', {
//       billboard_id: billboard.billboard_id,
//       dateTime: forDateTime
//     })

//     const handleNewBid = newBid => {
//       if (
//         newBid.billboard_id === billboard?.billboard_id &&
//         newBid.dateTime === forDateTime
//       ) {
//         console.log('New bid received:', newBid)
//         setBid(newBid.bid)
//         setValue(newBid.bid + 500)
//       }
//     }

//     const handleSocketConnect = () => {
//       console.log('Socket connected')
//       setIsSocketConnected(true)
//     }

//     const handleSocketDisconnect = () => {
//       console.log('Socket disconnected')
//       setIsSocketConnected(false)
//     }

//     socket.on('connect', handleSocketConnect)
//     socket.on('disconnect', handleSocketDisconnect)
//     socket.on('bid', handleNewBid)

//     return () => {
//       socket.off('connect', handleSocketConnect)
//       socket.off('disconnect', handleSocketDisconnect)
//       socket.off('bid', handleNewBid)
//       console.log(`Leaving room: ${roomName}`)
//       socket.emit('leaveRoom', {
//         billboard_id: billboard.billboard_id,
//         dateTime: forDateTime
//       })
//     }
//   }, [billboard, forDateTime])

//   useEffect(() => {
//     if (lastBidTime !== null) {
//       // Only start the interval if lastBidTime is not null
//       const interval = setInterval(() => {
//         const secondsPassed = Math.floor((Date.now() - lastBidTime) / 1000)
//         const secondsLeft = 60 - secondsPassed
//         setCountdown(secondsLeft)

//         if (secondsLeft <= 0) {
//           setCanBid(true)
//           clearInterval(interval)
//         } else {
//           setCanBid(false)
//         }
//       }, 1000) // Update countdown every second

//       return () => clearInterval(interval)
//     }
//   }, [lastBidTime])

//   useEffect(() => {
//     const fetchBidData = async () => {
//       try {
//         const response = await axios.get(
//           `${process.env.REACT_APP_API_URL}/bid?billboard_id=${billboard.billboard_id}&dateTime=${forDateTime}`,
//           {
//             headers: {
//               Authorization: `${Cookies.get('Authorization')}`
//             }
//           }
//         )
//         const latestBid = response.data
//         setBid(latestBid.bid || billboard.baseprice)
//         setValue(latestBid.bid + 500 || billboard.baseprice)
//       } catch (error) {
//         console.error('Failed to fetch bid data:', error)
//         alert('Failed to fetch bid data')
//       }
//     }

//     let fetchInterval = null

//     if (!isSocketConnected) {
//       fetchBidData() // Fetch immediately when socket disconnects
//       fetchInterval = setInterval(fetchBidData, 5000) // Fetch every 5 seconds
//     }

//     return () => {
//       if (fetchInterval) {
//         clearInterval(fetchInterval)
//       }
//     }
//   }, [isSocketConnected, forDateTime])

//   const handleBidSubmit = async () => {
//     setLastBidTime(Date.now())
//     setCanBid(false)
//     setCountdown(60) // Reset countdown

//     const bidData = {
//       bid: value,
//       dateTime: forDateTime,
//       billboard_id: billboard?.billboard_id,
//       user_id: user_id // Use the user_id from the cookie
//     }

//     try {
//       if (isSocketConnected) {
//         socket.emit('bid', bidData)
//       } else {
//         await axios.post(`${process.env.REACT_APP_API_URL}/bid`, bidData, {
//           headers: {
//             Authorization: `${Cookies.get('Authorization')}`
//           }
//         })
//       }
//       console.log(
//         `Bid submitted for: ${forDateTime} on billboard ID: ${billboard?.billboard_id}`
//       )
//     } catch (error) {
//       console.error('Failed to submit bid:', error)
//     }
//   }

//   console.log({ forDateTime })
//   return (
//     <Modal show={display} onHide={() => setDisplay(false)}>
//       <Modal.Header closeButton>
//         <Modal.Title>
//           {billboard.title} @ {formatDate(forDateTime)}
//         </Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <p>Current Bid: {bid}</p>
//         <Form onSubmit={e => e.preventDefault()}>
//           <Form.Group>
//             <Form.Label>Your Bid</Form.Label>
//             <Form.Control
//               type='number'
//               value={value}
//               onChange={e => setValue(Number(e.target.value))}
//               min={bid + 500} // Enforce the minimum bid increment
//               disabled={!canBid} // Disable input when not allowed to bid
//             />
//           </Form.Group>
//           <Button
//             variant='primary'
//             onClick={handleBidSubmit}
//             disabled={!canBid}
//             className='mt-3 mb-3'
//           >
//             Submit Bid
//           </Button>
//           {!canBid && (
//             <p className='text-muted'>
//               Please wait {countdown} seconds to place the next bid.
//             </p>
//           )}
//         </Form>
//       </Modal.Body>
//     </Modal>
//   )
// }




import React, { useState, useEffect, useContext } from 'react'
import { Form, Modal, Button } from 'react-bootstrap'
import io from 'socket.io-client'
import Cookies from 'js-cookie'
import { formatDate } from '../../utils/DateFormat'
import UserContext from '../../Context/UserContext'

const socket = io(process.env.REACT_APP_API_URL) // Connect to the server without token

export const BidPage = ({ billboard, display, setDisplay }) => {
  const { user } = useContext(UserContext)
  const user_id = Cookies.get('user_id') || user // Assuming user_id is stored in a cookie

  const getDefaultDateTime = () => {
    let now = new Date()

    // Add two days to the current date
    now.setDate(now.getDate() + 2)

    // Adjust minutes to either 00 or 30
    const minutes = now.getMinutes()
    if (minutes < 30) {
      now.setMinutes(0)
    } else {
      now.setMinutes(30)
    }
    now.setSeconds(0, 0) // Reset seconds and milliseconds

    // Format the date in local timezone manually
    const offset = now.getTimezoneOffset() * 60000 // offset in milliseconds
    const localISOTime = new Date(now - offset).toISOString().slice(0, 16)

    return localISOTime
  }

  const [forDateTime, setForDateTime] = useState(getDefaultDateTime())
  const [bid, setBid] = useState(billboard?.baseprice || 0)
  const [value, setValue] = useState((billboard?.baseprice || 0) + 500)
  const [lastBidTime, setLastBidTime] = useState(null) // Initialize as null
  const [canBid, setCanBid] = useState(true) // Initialize as true
  const [countdown, setCountdown] = useState(60) // 60 seconds countdown

  useEffect(() => {
    const roomName = `${billboard.billboard_id}_${forDateTime}`
    console.log(`Joining room: ${roomName}`)
    socket.emit('joinRoom', {
      billboard_id: billboard.billboard_id,
      dateTime: forDateTime
    })

    const handleNewBid = newBid => {
      if (
        newBid.billboard_id === billboard?.billboard_id &&
        newBid.dateTime === forDateTime
      ) {
        console.log('New bid received:', newBid)
        setBid(newBid.bid)
        setValue(newBid.bid + 500)
      }
    }

    socket.on('bid', handleNewBid)

    return () => {
      socket.off('bid', handleNewBid)
      console.log(`Leaving room: ${roomName}`)
      socket.emit('leaveRoom', {
        billboard_id: billboard.billboard_id,
        dateTime: forDateTime
      })
    }
  }, [billboard, forDateTime])

  useEffect(() => {
    if (lastBidTime !== null) {
      // Only start the interval if lastBidTime is not null
      const interval = setInterval(() => {
        const secondsPassed = Math.floor((Date.now() - lastBidTime) / 1000)
        const secondsLeft = 60 - secondsPassed
        setCountdown(secondsLeft)

        if (secondsLeft <= 0) {
          setCanBid(true)
          clearInterval(interval)
        } else {
          setCanBid(false)
        }
      }, 1000) // Update countdown every second

      return () => clearInterval(interval)
    }
  }, [lastBidTime])

  const handleBidSubmit = () => {
    setLastBidTime(Date.now())
    setCanBid(false)
    setCountdown(60) // Reset countdown

    socket.emit('bid', {
      bid: value,
      dateTime: forDateTime,
      billboard_id: billboard?.billboard_id,
      user_id: user_id // Use the user_id from the cookie
    })

    console.log(
      `Bid submitted for: ${forDateTime} on billboard ID: ${billboard?.billboard_id}`
    )
  }
  console.log({ forDateTime })
  return (
    <Modal show={display} onHide={() => setDisplay(false)}>
      <Modal.Header closeButton>
        <Modal.Title>
          {billboard.title} @ {formatDate(forDateTime)}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Current Bid: {bid}</p>
        <Form onSubmit={e => e.preventDefault()}>
          <Form.Group>
            <Form.Label>Your Bid</Form.Label>
            <Form.Control
              type='number'
              value={value}
              onChange={e => setValue(Number(e.target.value))}
              min={bid + 500} // Enforce the minimum bid increment
              disabled={!canBid} // Disable input when not allowed to bid
            />
          </Form.Group>
          <Button
            variant='primary'
            onClick={handleBidSubmit}
            disabled={!canBid}
            className='mt-3 mb-3'
          >
            Submit Bid
          </Button>
          {!canBid && (
            <p className='text-muted'>
              Please wait {countdown} seconds to place the next bid.
            </p>
          )}
        </Form>
      </Modal.Body>
    </Modal>
  )
}
