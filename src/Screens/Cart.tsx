import { addToCart, clearCart, removeFromCart, removeItemComplete, calculateCharges } from "../redux/slices/cartSlice"
import { FaArrowLeft, FaMinus, FaPlus, FaRegTrashAlt, FaTimesCircle } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { useEffect } from "react"
import type { AppDispatch, RootState } from "../redux/store"  

interface CartItem {
  _id: string
  title: string
  price: number
  discountedPrice?: number  
  discount: number
  onSale: boolean
  images: string[]
  quantity: number
}

const Cart = () => {

  const dispatch = useDispatch<AppDispatch>()
  const cartItems = useSelector((state: RootState) => state.cartSlice.items)
  const cartTotalQuantity = useSelector((state: RootState) => state.cartSlice.totalQuantity)

  let shipping_charges = 0

  const cartTotal = cartItems.reduce((total: number, item: CartItem) => {
    const itemPrice = item.discountedPrice ? item.discountedPrice : item.price
    return total + (itemPrice * item.quantity)
  }, 0)

  const originalTotal = cartItems.reduce((total: number, item: CartItem) => {
    return total + (item.price * item.quantity)
  }, 0)

  const savings = originalTotal - cartTotal

  if (originalTotal <= 2000) {
    shipping_charges = 200
  } else if (originalTotal > 2000 && originalTotal <= 10000) {
    shipping_charges = 500
  } else {
    shipping_charges = 0
  }

  const total = cartTotal + shipping_charges

  useEffect(() => {
    dispatch(calculateCharges({ shippingCharges: shipping_charges, saving: savings }))
  }, [cartItems])

  const handleRemoveFromCart = (id: string) => {
    dispatch(removeItemComplete(id))
  }

  const handleClearCart = () => {
    dispatch(clearCart())
  }

  const handleIncreaseQuantity = (item: CartItem) => {
    dispatch(addToCart(item))
  }

  const handleDecreaseQuantity = (item: CartItem) => {
    dispatch(removeFromCart(item._id))
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
        <p className="text-gray-500 mb-8">Looks like you haven't added anything yet</p>
        <Link to="/" className="bg-sky-600 text-white px-8 py-3 rounded-lg hover:bg-sky-700 transition-colors text-lg">
          Start Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-gradient-to-r from-sky-700 via-sky-600 to-sky-700 rounded-t-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Shopping Cart</h1>
              <p className="text-sky-200 mt-1">{cartTotalQuantity} item{cartTotalQuantity !== 1 ? 's' : ''} in your cart</p>
            </div>
            <button onClick={handleClearCart} className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium">
              <FaTimesCircle /> Clear Cart
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-b-lg shadow-lg overflow-hidden">
              <div className="divide-y divide-gray-200">
                {cartItems.map((item: CartItem) => (
                  <div key={item._id} className="p-4 flex items-center gap-4 hover:bg-sky-50">
                    <img src={item.images?.[0]} alt={item.title} className="w-24 h-24 object-cover rounded-lg" />

                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{item.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        {item.onSale && item.discount > 0 ? (
                          <>
                            <span className="text-sky-600 font-bold">Rs. {item.discountedPrice?.toFixed(2)}</span>
                            <span className="text-gray-400 line-through text-sm">Rs. {item.price.toFixed(2)}</span>
                            <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">-{item.discount}%</span>
                          </>
                        ) : (
                          <p className="text-sky-600 font-bold">Rs. {item.price.toFixed(2)}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button onClick={() => handleDecreaseQuantity(item)} className="w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300 flex items-center justify-center">
                        <FaMinus className="text-xs" />
                      </button>
                      <span className="w-8 text-center font-semibold">{item.quantity}</span>
                      <button onClick={() => handleIncreaseQuantity(item)} className="w-8 h-8 bg-sky-500 hover:bg-sky-600 text-white rounded-full flex items-center justify-center">
                        <FaPlus className="text-xs" />
                      </button>
                    </div>

                    <div className="text-right min-w-[80px]">
                      <p className="font-bold text-lg">
                        Rs. {((item.discountedPrice || item.price) * item.quantity).toFixed(2)}
                      </p>
                      <button onClick={() => handleRemoveFromCart(item._id)} className="mt-2 w-full flex items-center justify-center gap-1 text-red-500 bg-red-50 hover:bg-red-100 px-3 py-1 rounded transition-colors text-sm">
                        <FaRegTrashAlt className="text-xs" /> Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-gray-50 border-t">
                <Link to="/" className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-800 font-medium">
                  <FaArrowLeft /> Continue Shopping
                </Link>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-sky-700 via-sky-600 to-sky-700 p-4">
                <h2 className="font-semibold text-white text-lg">Order Summary</h2>
              </div>

              <div className="p-6">
                <div className="space-y-3 border-b border-gray-200 pb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">Rs. {originalTotal.toFixed(2)}</span>
                  </div>
                  {savings > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Discount</span>
                      <span className="font-semibold text-sky-600">-Rs. {savings.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    {shipping_charges > 0
                      ? <span className="font-semibold text-sky-600">Rs. {shipping_charges}</span>
                      : <span className="font-semibold text-red-500">FREE</span>
                    }
                  </div>
                </div>

                <div className="flex justify-between py-4">
                  <span className="font-bold text-lg">Total</span>
                  <span className="font-bold text-lg text-sky-600">Rs. {total.toFixed(2)}</span>
                </div>

                <Link to="/checkout">
                  <button className="w-full bg-sky-600 text-white py-3 rounded-lg hover:bg-sky-700 transition-colors font-bold">
                    Checkout
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart