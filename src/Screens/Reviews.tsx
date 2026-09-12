// src/Screens/Reviews.tsx

import { useEffect, useState } from 'react'
import { MdOutlineStar, MdOutlineStarBorder } from 'react-icons/md'
import { toast } from 'react-toastify'
import apis from '../config/apis'

// ─── Types ────────────────────────────────────────────────────────────────────

interface ReviewUser {
  _id: string
  first_name: string
  last_name: string
}

interface Review {
  _id: string
  userId: ReviewUser
  rating: number
  comment: string
  createdAt: string
}

interface ReviewsProps {
  productId: string
}

// ─── Star Selector ────────────────────────────────────────────────────────────

const StarSelector = ({ value, onChange }: { value: number; onChange: (n: number) => void }) => {
  const [hovered, setHovered] = useState(0)

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          className="text-2xl transition-transform hover:scale-110"
        >
          {star <= (hovered || value)
            ? <MdOutlineStar className="text-yellow-400" />
            : <MdOutlineStarBorder className="text-gray-300" />
          }
        </button>
      ))}
    </div>
  )
}

// ─── Star Display ─────────────────────────────────────────────────────────────

const StarDisplay = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((star) => (
      star <= rating
        ? <MdOutlineStar key={star} className="text-yellow-400 text-base" />
        : <MdOutlineStarBorder key={star} className="text-gray-300 text-base" />
    ))}
  </div>
)

// ─── Main Component ───────────────────────────────────────────────────────────

const Reviews = ({ productId }: ReviewsProps) => {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const authRaw = localStorage.getItem('auth')
  const isLoggedIn = !!authRaw

  // ── Fetch on mount / productId change ─────────────────────────────────────
  useEffect(() => {
    let cancelled = false

    const fetchReviews = async () => {
      try {
        setLoading(true)
        const res = await fetch(`${apis.review}/${productId}`)
        const data = await res.json()
        if (!cancelled && data.success) setReviews(data.success.reviews)
      } catch {
        if (!cancelled) toast.error('Reviews load nahi ho sake')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchReviews()

    return () => {
      cancelled = true
    }
  }, [productId])

  // ── Refetch after submit (plain async, no hook) ────────────────────────────
  const refetchReviews = async () => {
    try {
      const res = await fetch(`${apis.review}/${productId}`)
      const data = await res.json()
      if (data.success) setReviews(data.success.reviews)
    } catch {
      toast.error('Reviews load nahi ho sake')
    }
  }

  // ── Submit Review ──────────────────────────────────────────────────────────
  const handleSubmit = async () => {
    if (rating === 0) return toast.warning('Rating select karein')
    if (!comment.trim()) return toast.warning('Comment likhein')

    try {
      setSubmitting(true)
      const res = await fetch(`${apis.review}/${productId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ rating, comment }),
      })
      const data = await res.json()

      if (data.success) {
        toast.success('Review submit ho gaya!')
        setRating(0)
        setComment('')
        await refetchReviews()
      }
      if (data.warning) toast.warning(data.warning)
      if (data.error) toast.error(data.error)
    } catch {
      toast.error('Kuch ghalat ho gaya')
    } finally {
      setSubmitting(false)
    }
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="space-y-6">

      {/* Form — sirf logged-in */}
      {isLoggedIn ? (
        <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
          <h3 className="font-semibold text-gray-800 mb-4">Apna Review Likhein</h3>
          <div className="mb-3">
            <p className="text-sm text-gray-500 mb-1">Rating</p>
            <StarSelector value={rating} onChange={setRating} />
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Apna experience share karein..."
            rows={3}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="mt-3 bg-sky-700 hover:bg-sky-800 disabled:bg-gray-300 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors"
          >
            {submitting ? 'Submit ho raha hai...' : 'Submit Review'}
          </button>
        </div>
      ) : (
        <div className="bg-sky-50 border border-sky-100 rounded-xl p-4 text-sm text-sky-700 text-center">
          Review dene ke liye{' '}
          <a href="/login" className="font-semibold underline">login karein</a>
        </div>
      )}

      {/* Reviews List */}
      {loading ? (
        <p className="text-sm text-gray-400 text-center py-4">Reviews load ho rahe hain...</p>
      ) : reviews.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-4">Abhi koi review nahi — pehle aap dein!</p>
      ) : (
        <div className="space-y-4">
          <p className="text-sm font-semibold text-gray-600">{reviews.length} Review{reviews.length !== 1 ? 's' : ''}</p>
          {reviews.map((review) => (
            <div key={review._id} className="border border-gray-100 rounded-xl p-4 bg-white">
              <div className="flex items-center justify-between mb-1">
                <p className="font-semibold text-gray-800 text-sm">
                  {review.userId?.first_name} {review.userId?.last_name}
                </p>
                <span className="text-xs text-gray-400">
                  {new Date(review.createdAt).toLocaleDateString('en-PK', {
                    day: 'numeric', month: 'short', year: 'numeric'
                  })}
                </span>
              </div>
              <StarDisplay rating={review.rating} />
              <p className="text-sm text-gray-600 mt-2 leading-relaxed">{review.comment}</p>
            </div>
          ))}
        </div>
      )}

    </div>
  )
}

export default Reviews