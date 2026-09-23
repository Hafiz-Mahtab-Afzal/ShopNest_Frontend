import axios from 'axios'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { FiPhone, FiHome, FiMapPin, FiMap, FiGlobe } from 'react-icons/fi'
import { MdOutlineLocalPostOffice } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import type { RootState } from '../../redux/store'
import apis from '../../config/apis'
import { errortoast } from '../../toastify/toastify'

interface OrderForm {
  phone: string
  address: string
  pastal_code: string
  city: string
  state: string
  country: string
}

const Checkout = () => {

  const navigate = useNavigate()
  const [authLoading, setAuthLoading] = useState(true)

  const { items: cartItems } = useSelector((state: RootState) => state.cartSlice)

  const shippingCharges =
    cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0) > 3000 ? 0 : 200

  const saving = cartItems.reduce(
    (acc, item) =>
      item.onSale && item.discount
        ? acc + ((item.price * item.discount) / 100) * item.quantity
        : acc,
    0
  )

  const [loading, setLoading] = useState(false)
  const [order, setorder] = useState<OrderForm>({
    phone: '',
    address: '',
    pastal_code: '',
    city: '',
    state: '',
    country: '',
  })

  useEffect(() => {
    // Ab hum GET request '/check-auth' par bhej rahe hain
    axios.get(`${apis.order}/check-auth`, { withCredentials: true })
      .then(() => {
        setAuthLoading(false)
      })
      .catch(() => {
        // Agar session expire hai ya error hai, redirect to login
        navigate('/login')
      })
  }, [navigate])

  const changehandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name
    const value = e.target.value
    setorder({ ...order, [name]: value })
  }

  const checkouthandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      setLoading(true)
      const { data } = await axios.post(
        `${apis.order}/create-checkout-session`,
        { cartItems, shippingCharges, saving, shippingAddress: order },
        { withCredentials: true }
      )
      window.location.href = data.url
    } catch (err: unknown) {
      const error = err as { response?: { data?: { error?: string } } }
      errortoast(error?.response?.data?.error || 'Something went wrong')
      setLoading(false)
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-500 text-lg font-medium">Checking authentication...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 lg:px-0 py-10 lg:py-20 bg-gray-100">
      <div className="w-full max-w-2xl rounded-2xl overflow-hidden shadow-lg">

        {/* Header */}
        <div className="bg-sky-700 px-5 lg:px-10 py-8 text-white text-center">
          <h2 className="text-2xl lg:text-3xl font-bold">Checkout</h2>
          <p className="text-white/70 text-sm mt-1">Fill in your delivery details</p>
        </div>

        {/* Form */}
        <div className="bg-white px-5 lg:px-10 py-8">
          <form onSubmit={checkouthandler} className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* Phone */}
            <div className="relative">
              <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-sky-700" />
              <input
                type="text"
                name="phone"
                value={order.phone}
                onChange={changehandler}
                placeholder="Phone Number"
                required
                className="w-full pl-9 pr-3 py-3 rounded-lg border border-gray-200 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-sky-700 text-sm"
              />
            </div>

            {/* Postal Code */}
            <div className="relative">
              <MdOutlineLocalPostOffice className="absolute left-3 top-1/2 -translate-y-1/2 text-sky-700" />
              <input
                type="text"
                name="pastal_code"
                value={order.pastal_code}
                onChange={changehandler}
                placeholder="Postal Code"
                required
                className="w-full pl-9 pr-3 py-3 rounded-lg border border-gray-200 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-sky-700 text-sm"
              />
            </div>

            {/* Address */}
            <div className="relative sm:col-span-2">
              <FiHome className="absolute left-3 top-1/2 -translate-y-1/2 text-sky-700" />
              <input
                type="text"
                name="address"
                value={order.address}
                onChange={changehandler}
                placeholder="Address"
                required
                className="w-full pl-9 pr-3 py-3 rounded-lg border border-gray-200 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-sky-700 text-sm"
              />
            </div>

            {/* City */}
            <div className="relative">
              <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-sky-700" />
              <input
                type="text"
                name="city"
                value={order.city}
                onChange={changehandler}
                placeholder="City"
                required
                className="w-full pl-9 pr-3 py-3 rounded-lg border border-gray-200 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-sky-700 text-sm"
              />
            </div>

            {/* State */}
            <div className="relative">
              <FiMap className="absolute left-3 top-1/2 -translate-y-1/2 text-sky-700" />
              <input
                type="text"
                name="state"
                value={order.state}
                onChange={changehandler}
                placeholder="State"
                required
                className="w-full pl-9 pr-3 py-3 rounded-lg border border-gray-200 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-sky-700 text-sm"
              />
            </div>

            {/* Country */}
            <div className="relative sm:col-span-2">
              <FiGlobe className="absolute left-3 top-1/2 -translate-y-1/2 text-sky-700" />
              <input
                type="text"
                name="country"
                value={order.country}
                onChange={changehandler}
                placeholder="Country"
                required
                className="w-full pl-9 pr-3 py-3 rounded-lg border border-gray-200 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-sky-700 text-sm"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="sm:col-span-2 mt-2 bg-sky-700 hover:bg-sky-800 text-white py-3 rounded-lg font-semibold transition text-sm tracking-wide disabled:opacity-60"
            >
              {loading ? 'Redirecting to Payment...' : 'Proceed to Payment →'}
            </button>

          </form>
        </div>
      </div>
    </div>
  )
}

export default Checkout