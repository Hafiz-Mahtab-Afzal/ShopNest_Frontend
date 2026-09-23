import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useSearchParams } from 'react-router-dom'
import type { AppDispatch } from '../../redux/store'
import { clearCart } from '../../redux/slices/cartSlice'
import axios from 'axios'
import apis from '../../config/apis'


// ✅ TypeScript cheez #1: type alias
// JavaScript mein ye nahi hota
// Status sirf ye 3 values le sakta hai — baaki kuch nahi
type StatusType = 'loading' | 'success' | 'error'

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams()
  const session_id = searchParams.get('session_id')

  // ✅ TypeScript cheez #2: useState ko type batao
  // JavaScript: useState('loading')
  // TypeScript: useState<StatusType>('loading')
  const [status, setStatus] = useState<StatusType>('loading')

  // ✅ TypeScript cheez #3: useDispatch ko type batao
  // JavaScript: useDispatch()
  // TypeScript: useDispatch<AppDispatch>()
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (!session_id) {
      dispatch(clearCart())
      return setStatus('error')
    }

    axios.get(`${apis.order}/verify-payment?session_id=${session_id}`, {
      withCredentials: true
    })
      .then(() => {
        setStatus('success')
        dispatch(clearCart())
      })
      .catch(() => setStatus('error'))
  }, [session_id, dispatch])

  if (status === 'loading') return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-500 text-lg">Verifying your payment...</p>
    </div>
  )

  if (status === 'error') return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-red-500 text-2xl font-bold mb-3">❌ Payment Failed</p>
        <Link to="/cart" className="text-sky-600 underline">Back to Cart</Link>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 lg:px-0">
      <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-12 text-center max-w-md">
        <div className="text-6xl mb-4">✅</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h2>
        <p className="text-gray-500 mb-6">Your order has been placed successfully.</p>
        <Link
          to="/"
          className="bg-sky-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-sky-800 transition"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  )
}

export default PaymentSuccess