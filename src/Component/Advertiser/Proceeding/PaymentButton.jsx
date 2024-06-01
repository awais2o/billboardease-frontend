import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { loadStripe } from '@stripe/stripe-js'
import {
  Elements,
  useStripe,
  useElements,
  CardElement
} from '@stripe/react-stripe-js'

// Load Stripe with your publishable key
const stripePromise = loadStripe(process.env.REACT_APP_PUBLICATION_KEY) // Replace with your actual publishable key

const CheckoutForm = ({ amount, currency, onClose, order_id, refetch }) => {
  const stripe = useStripe()
  const elements = useElements()
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false) // State to track payment processing

  const handleClick = async () => {
    if (!stripe || !elements || isProcessing) {
      // Prevent further execution if stripe isn't loaded, elements aren't loaded or if a payment is already processing
      return
    }

    setIsProcessing(true) // Indicate payment is processing
    const cardElement = elements.getElement(CardElement)
    const { error: paymentMethodError, paymentMethod } =
      await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement
      })

    if (paymentMethodError) {
      setError(paymentMethodError.message)
      setIsProcessing(false) // Reset processing status
      return
    }

    const response = await fetch('http://localhost:5001/payment/initiate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ amount: amount, currency: currency, order_id })
    })

    const { clientSecret } = await response.json()

    const { error: confirmError } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: paymentMethod.id
      }
    )

    if (confirmError) {
      setError(confirmError.message)
      setIsProcessing(false) // Reset processing status if there's an error
    } else {
      setSuccess(true)
      setIsProcessing(false) // Reset processing status after successful payment
      refetch()

      onClose() // Close modal on success
    }
  }

  return (
    <div>
      <CardElement options={{ style: { base: { fontSize: '18px' } } }} />
      {error && <div className='text-danger mt-3'>{error}</div>}
      {success && <div className='text-success mt-3'>Payment successful!</div>}
      {isProcessing && (
        <div className='text-info mt-3'>Payment Processing!</div>
      )}
      <Button
        className='me-2 mt-3'
        variant='primary'
        onClick={handleClick}
        disabled={!stripe || isProcessing}
      >
        Pay
      </Button>

      <Button className='mt-3' variant='secondary' onClick={onClose}>
        Close
      </Button>
    </div>
  )
}

const PaymentButton = ({
  amount,
  currency,
  showModal,
  setShowModal,
  order,
  refetch
}) => (
  <div>
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Enter Card Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Elements stripe={stripePromise}>
          <CheckoutForm
            order_id={order?.order_id}
            amount={amount}
            currency={currency}
            onClose={() => setShowModal(false)}
            refetch={refetch}
          />
        </Elements>
      </Modal.Body>
    </Modal>
  </div>
)

export default PaymentButton
