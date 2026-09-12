import { useDispatch, useSelector } from "react-redux"
import { removeFromWishlist, clearWishlist } from "../redux/slices/wishlistSlice"
import { addToCart } from "../redux/slices/cartSlice"
import { FaArrowLeft, FaHeart, FaRegTrashAlt, FaShoppingCart, FaTimesCircle } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"
import type { AppDispatch, RootState } from "../redux/store"

// ─── Types ────────────────────────────────────────────────────────────────────

interface WishlistItem {
  _id: string
  title: string
  price: number
  discountedPrice?: number
  discount?: number
  onSale?: boolean
  images: string[]
}

// ─── Component ────────────────────────────────────────────────────────────────

const Mylist = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const wishlistItems = useSelector((state: RootState) => state.wishlistSlice.items)

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handleRemove = (id: string) => {
    dispatch(removeFromWishlist(id))
  }

  const handleClearAll = () => {
    dispatch(clearWishlist())
  }

  /**
   * Move item to cart then remove from wishlist.
   * addToCart expects a product object — adjust shape if your cartSlice differs.
   */
  const handleMoveToCart = (item: WishlistItem) => {
    dispatch(addToCart({ ...item, quantity: 1 }))
    dispatch(removeFromWishlist(item._id))
  }

  // ── Empty State ────────────────────────────────────────────────────────────

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
        <FaHeart className="text-6xl text-sky-200 mb-4" />
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Your wishlist is empty</h2>
        <p className="text-gray-500 mb-8 text-center">
          Save items you love — they'll be waiting here for you.
        </p>
        <Link
          to="/"
          className="bg-sky-600 text-white px-8 py-3 rounded-lg hover:bg-sky-700 transition-colors text-lg font-medium"
        >
          Browse Products
        </Link>
      </div>
    )
  }

  // ── Main View ─────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">

        {/* ── Header Banner ───────────────────────────────────────────────── */}
        <div className="bg-gradient-to-r from-sky-700 via-sky-600 to-sky-700 rounded-t-lg p-6 mb-0">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                <FaHeart /> My Wishlist
              </h1>
              <p className="text-sky-200 mt-1">
                {wishlistItems.length} saved item{wishlistItems.length !== 1 ? "s" : ""}
              </p>
            </div>
            <button
              onClick={handleClearAll}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
            >
              <FaTimesCircle /> Clear All
            </button>
          </div>
        </div>

        {/* ── Items List ──────────────────────────────────────────────────── */}
        <div className="bg-white shadow-lg rounded-b-lg overflow-hidden">
          <div className="divide-y divide-gray-100">
            {wishlistItems.map((item: WishlistItem) => {
              const displayPrice = item.discountedPrice ?? item.price

              return (
                <div
                  key={item._id}
                  className="p-4 flex items-center gap-4 hover:bg-sky-50 transition-colors"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.images?.[0]}
                    alt={item.title}
                    className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                  />

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-800 truncate">{item.title}</h3>

                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      {item.onSale && item.discount && item.discount > 0 ? (
                        <>
                          <span className="text-sky-600 font-bold">
                            Rs. {displayPrice.toFixed(2)}
                          </span>
                          <span className="text-gray-400 line-through text-sm">
                            Rs. {item.price.toFixed(2)}
                          </span>
                          <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                            -{item.discount}%
                          </span>
                        </>
                      ) : (
                        <span className="text-sky-600 font-bold">
                          Rs. {item.price.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row items-center gap-2 flex-shrink-0">
                    {/* Move to Cart */}
                    <button
                      onClick={() => handleMoveToCart(item)}
                      className="flex items-center gap-1.5 bg-sky-600 hover:bg-sky-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
                    >
                      <FaShoppingCart className="text-xs" />
                      <span className="hidden sm:inline">Move to Cart</span>
                      <span className="sm:hidden">Cart</span>
                    </button>

                    {/* Remove */}
                    <button
                      onClick={() => handleRemove(item._id)}
                      className="flex items-center gap-1.5 text-red-500 bg-red-50 hover:bg-red-100 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      <FaRegTrashAlt className="text-xs" />
                      <span className="hidden sm:inline">Remove</span>
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          {/* ── Footer ──────────────────────────────────────────────────────── */}
          <div className="p-4 bg-gray-50 border-t flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-800 font-medium transition-colors"
            >
              <FaArrowLeft /> Continue Shopping
            </button>

            <Link
              to="/cart"
              className="text-sm text-gray-500 hover:text-sky-600 transition-colors"
            >
              View Cart →
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Mylist