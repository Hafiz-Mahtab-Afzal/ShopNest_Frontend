import { useParams, Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import type { AppDispatch, RootState } from '../redux/store'
import type { Product } from '../redux/slices/productSlice'
import { useEffect, useState } from 'react'
import { getproduct } from '../redux/actions/ProductAction'
import { FaShoppingCart, FaHeart, FaRegHeart } from 'react-icons/fa'
import { addToCart, removeFromCart } from '../redux/slices/cartSlice'
import { addToWishlist, removeFromWishlist } from '../redux/slices/wishlistSlice'
import { infotoast } from '../toastify/toastify'
import { discountPriceCalc } from '../functions/helper'
import Reviews from './Reviews'

const Singlepage = () => {
  const { id } = useParams() as { id: string }
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const [activeImg, setActiveImg] = useState(0)
  const [qty, setQty] = useState(1)
  const [activeTab, setActiveTab] = useState('description')

  const { singleproduct, loader } = useSelector((state: RootState) => state.productSlice)
  const product = singleproduct as Product

  const cartItems = useSelector((state: RootState) => state.cartSlice.items)
  const wishlistItems = useSelector((state: RootState) => state.wishlistSlice.items)

  useEffect(() => {
    dispatch(getproduct(id))
  }, [id, dispatch])

  if (loader) return <div className="min-h-screen flex items-center justify-center">Loading...</div>

  if (!product) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h2 className="text-2xl font-bold text-gray-700">Product not found</h2>
      <Link to="/" className="bg-sky-700 text-white px-6 py-2 rounded-lg">Go Home</Link>
    </div>
  )

  const {
    _id, title, subtitle, brand, category,
    price, discription, images = [], stock,
    onSale, discount, warranty_information,
    sku, dimension
  } = product

  const isInCart = cartItems.some((i) => i._id === _id)
  const isInWishlist = wishlistItems.some((i) => i._id === _id)
  const discountedPrice = discountPriceCalc(onSale, discount, price)
  const savedAmount = price - Number(discountedPrice)

  const handleAddToCart = () => {
    if (isInCart) {
      dispatch(removeFromCart(_id))
      infotoast(`${title} removed from cart`)
    } else {
      dispatch(addToCart(product))
      infotoast(`${title} added to cart`)
    }
  }

  const handleAddToWishlist = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(_id))
      infotoast(`${title} removed from wishlist`)
    } else {
      dispatch(addToWishlist(product))
      infotoast(`${title} added to wishlist`)
    }
  }

  const handleBuyNow = () => {
    if (!isInCart) {
      dispatch(addToCart(product))
    }
    navigate('/checkout')
  }

  return (
    <div className="bg-gray-50 min-h-screen">

      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1280px] mx-auto px-4 py-2 text-[13px] text-gray-500 flex items-center gap-1">
          <Link to="/" className="hover:text-sky-700">Home</Link>
          <span>/</span>
          <span className="capitalize">{category}</span>
          <span>/</span>
          <span className="text-gray-800 font-medium">{title}</span>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-sm flex flex-col lg:flex-row overflow-hidden">

          <div className="lg:w-[420px] flex-shrink-0 p-5 border-r border-gray-100">
            <div className="w-full aspect-square bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
              {images.length > 0 ? (
                <img src={images[activeImg]} alt={title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300">No Image</div>
              )}
            </div>

            {images.length > 1 && (
              <div className="flex gap-2 mt-3 flex-wrap">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all bg-gray-50 ${
                      i === activeImg ? 'border-sky-700' : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <img src={img} alt={`thumb-${i}`} className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex-1 p-5 lg:p-8">
            {brand && <p className="text-xs font-semibold text-sky-700 uppercase tracking-wider mb-1">{brand}</p>}
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            {subtitle && <p className="text-gray-500 mt-1 text-sm">{subtitle}</p>}

            <span className={`inline-block mt-2 text-xs font-semibold px-2 py-1 rounded ${
              stock > 0 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'
            }`}>
              {stock > 0 ? `✓ In Stock (${stock})` : '✗ Out of Stock'}
            </span>

            <hr className="my-4 border-gray-100" />

            <div className="flex items-end gap-3 flex-wrap">
              <span className="text-3xl font-extrabold text-sky-700">
                Rs. {Number(discountedPrice).toLocaleString()}
              </span>
              {onSale && discount > 0 && (
                <>
                  <span className="text-lg text-gray-400 line-through">Rs. {Number(price).toLocaleString()}</span>
                  <span className="bg-sky-50 text-sky-700 text-xs font-bold px-2 py-1 rounded">
                    Save Rs. {Number(savedAmount).toLocaleString()} ({discount}% off)
                  </span>
                </>
              )}
            </div>

            <hr className="my-4 border-gray-100" />

            <div className="flex items-center gap-4 mb-5">
              <span className="text-sm font-medium text-gray-700">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 font-bold">−</button>
                <span className="w-10 text-center text-sm font-semibold">{qty}</span>
                <button onClick={() => setQty(q => Math.min(stock, q + 1))} className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 font-bold">+</button>
              </div>
              <span className="text-xs text-gray-400">{stock} available</span>
            </div>

            <div className="flex gap-3 flex-wrap">
              <button
                onClick={handleBuyNow}
                disabled={stock === 0}
                className="flex-1 min-w-[140px] bg-sky-700 hover:bg-sky-800 disabled:bg-gray-300 text-white font-bold py-3 px-6 rounded-lg text-sm"
              >
                Buy Now
              </button>
              <button
                onClick={handleAddToCart}
                disabled={stock === 0}
                className={`flex-1 min-w-[160px] flex items-center justify-center gap-2 font-bold py-3 px-6 rounded-lg text-sm border-2 transition ${
                  isInCart
                    ? 'bg-sky-700 text-white border-sky-700'
                    : 'border-sky-700 text-sky-700 bg-white hover:bg-sky-50'
                } ${stock === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <FaShoppingCart /> {isInCart ? 'Remove from Cart' : 'Add to Cart'}
              </button>
              <button
                onClick={handleAddToWishlist}
                className={`w-12 h-12 flex items-center justify-center rounded-lg border-2 transition ${
                  isInWishlist
                    ? 'bg-red-500 border-red-500 text-white'
                    : 'border-gray-300 text-gray-500 hover:border-red-400 hover:text-red-400'
                }`}
              >
                {isInWishlist ? <FaHeart /> : <FaRegHeart />}
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm mt-4 overflow-hidden">
          <div className="flex border-b border-gray-200">
            {['description', 'specifications', 'reviews'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3.5 text-sm font-semibold capitalize border-b-2 -mb-px transition ${
                  activeTab === tab ? 'border-sky-700 text-sky-700' : 'border-transparent text-gray-500 hover:text-gray-800'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === 'description' && (
              <p className="text-gray-600 text-sm leading-relaxed max-w-3xl">
                {discription || 'No description available.'}
              </p>
            )}

            {activeTab === 'specifications' && (
              <table className="w-full text-sm max-w-lg">
                <tbody>
                  {brand && <tr className="border-b"><td className="py-2.5 pr-4 font-medium text-gray-500 w-36">Brand</td><td className="py-2.5 text-gray-800">{brand}</td></tr>}
                  {category && <tr className="border-b"><td className="py-2.5 pr-4 font-medium text-gray-500">Category</td><td className="py-2.5 text-gray-800 capitalize">{category}</td></tr>}
                  {sku && <tr className="border-b"><td className="py-2.5 pr-4 font-medium text-gray-500">SKU</td><td className="py-2.5 text-gray-800">{sku}</td></tr>}
                  {warranty_information && <tr className="border-b"><td className="py-2.5 pr-4 font-medium text-gray-500">Warranty</td><td className="py-2.5 text-gray-800">{warranty_information}</td></tr>}
                  {dimension?.weight > 0 && <tr className="border-b"><td className="py-2.5 pr-4 font-medium text-gray-500">Weight</td><td className="py-2.5 text-gray-800">{dimension.weight} kg</td></tr>}
                  {dimension?.height > 0 && <tr className="border-b"><td className="py-2.5 pr-4 font-medium text-gray-500">Height</td><td className="py-2.5 text-gray-800">{dimension.height} cm</td></tr>}
                  {dimension?.width > 0 && <tr className="border-b"><td className="py-2.5 pr-4 font-medium text-gray-500">Width</td><td className="py-2.5 text-gray-800">{dimension.width} cm</td></tr>}
                </tbody>
              </table>
            )}

            {activeTab === 'reviews' && <Reviews productId={id} />}
          </div>
        </div>

      </div>
    </div>
  )
}

export default Singlepage