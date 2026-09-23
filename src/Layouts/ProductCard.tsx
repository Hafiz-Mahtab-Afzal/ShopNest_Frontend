import type { Product } from '../redux/slices/productSlice'
import { BsCart2, BsEye } from 'react-icons/bs'
import { FaHeart, FaRegHeart, FaTag } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../redux/store'
import { addToWishlist, removeFromWishlist } from '../redux/slices/wishlistSlice'
import { addToCart, removeFromCart } from '../redux/slices/cartSlice'
import { infotoast } from '../toastify/toastify'
import { discountPriceCalc } from '../functions/helper'
import Rating from '../Layouts/Rating'

const ProductCard = ({ product }: { product: Product }) => {

  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { _id, title, category, images, price, stock, rating, discount, onSale } = product

  const wishlistItems = useSelector((s: RootState) => s.wishlistSlice.items)
  const cartItems = useSelector((s: RootState) => s.cartSlice.items)
  const isInCart = cartItems.some((i) => i._id === _id)
  const isInWishlist = wishlistItems.some((i) => i._id === _id)
  const discountedPrice = discountPriceCalc(onSale, discount, price)

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (isInCart) {
      dispatch(removeFromCart(_id))
      infotoast(`${title} removed from cart`)
    } else {
      dispatch(addToCart(product))
      infotoast(`${title} added to cart`)
    }
  }

  const handleAddToWishlist = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (isInWishlist) {
      dispatch(removeFromWishlist(_id))
      infotoast(`${title} removed from wishlist`)
    } else {
      dispatch(addToWishlist(product))
      infotoast(`${title} added to wishlist`)
    }
  }

  return (
    <div className="productItem group relative bg-white rounded-2xl overflow-hidden border border-sky-100 hover:border-sky-300 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(14,165,233,0.15)] flex flex-col">

      {/* Image */}
      <Link to={`/product/${_id}`} className="block relative overflow-hidden h-[170px] sm:h-[210px] bg-sky-50">
        <img src={images?.[1]} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        {images?.[1] && (
          <img src={images[0]} className="w-full h-full object-cover absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        )}

        {/* Badges */}
        {discount > 0 && onSale && (
          <span className="absolute top-3 left-3 bg-sky-500 text-white text-[11px] font-bold px-2 py-1 rounded-lg flex items-center gap-1 shadow">
            <FaTag className="w-3 h-3" /> -{discount}%
          </span>
        )}
        {stock === 0 && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-[11px] font-bold px-2 py-1 rounded-lg">Out of Stock</span>
        )}
        {stock > 0 && stock <= 10 && (
          <span className="absolute top-3 left-3 bg-amber-500 text-white text-[11px] font-bold px-2 py-1 rounded-lg">Only {stock} left</span>
        )}

        {/* Hover actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">

          <button
            onClick={handleAddToWishlist}
            className={`w-8 h-8 rounded-xl flex items-center justify-center shadow-md transition ${isInWishlist ? 'bg-red-500 text-white' : 'bg-white text-sky-500 hover:bg-sky-500 hover:text-white'}`}
          >
            {isInWishlist ? <FaHeart className="text-sm" /> : <FaRegHeart className="text-sm" />}
          </button>

          {/* ✅ Link hataya — navigate use kiya */}
          <button
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault()
              e.stopPropagation()
              navigate(`/product/${_id}`)
            }}
            className="w-8 h-8 rounded-xl bg-white text-sky-500 hover:bg-sky-500 hover:text-white flex items-center justify-center shadow-md transition"
          >
            <BsEye className="text-sm" />
          </button>

        </div>
      </Link>

      {/* Info */}
      <div className="p-3 sm:p-4 flex flex-col gap-1 flex-1">
        <span className="text-[11px] font-semibold text-sky-500 uppercase tracking-wider">{category}</span>
        <Link to={`/product/${_id}`} className="text-[14px] font-medium text-slate-800 hover:text-sky-600 transition line-clamp-2 leading-snug">{title}</Link>
        <div className="mt-1">
          <Rating rating={rating || 0} />
        </div>
        <div className="flex flex-wrap items-center gap-2 mt-1">
          {onSale && discount > 0 ? (
            <>
              <span className="text-sky-600 font-bold text-[16px]">Rs. {discountedPrice}</span>
              <span className="text-gray-400 line-through text-[12px]">Rs. {price}</span>
            </>
          ) : (
            <span className="text-sky-600 font-bold text-[16px]">Rs. {price}</span>
          )}
        </div>
      </div>

      {/* Add to Cart */}
      <div className="px-3 sm:px-4 pb-3 sm:pb-4">
        <button
          onClick={handleAddToCart}
          disabled={stock === 0}
          className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-300
            ${stock === 0 ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : isInCart ? 'bg-sky-500 text-white hover:bg-sky-600'
            : 'bg-sky-50 text-sky-600 border border-sky-200 hover:bg-sky-500 hover:text-white hover:border-sky-500'}`}
        >
          <BsCart2 className="text-[16px]" />
          {stock === 0 ? 'Out of Stock' : isInCart ? 'Remove from Cart' : 'Add to Cart'}
        </button>
      </div>

    </div>
  )
}

export default ProductCard