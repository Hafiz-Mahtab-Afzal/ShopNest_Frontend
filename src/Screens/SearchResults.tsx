import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { FaStar } from 'react-icons/fa'
import type { AppDispatch, RootState } from '../redux/store'
import Loader from '../Layouts/Loader'
import ProductCard from '../Layouts/ProductCard'
import { getproducts } from '../redux/actions/ProductAction'
import type { Product } from '../redux/slices/productSlice'

const SearchResults = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [searchParams] = useSearchParams()
  const title: string = searchParams.get('title') || ''

  const { products, loader, total, totalPages, currentPage } = useSelector(
    (state: RootState) => state.productSlice
  )
  const categories = useSelector((state: RootState) => state.productSlice.categories)

  // totalPages backend se null bhi aa sakta hai, is liye 0 fallback
  const pageCount = totalPages ?? 0

  const [category, setCategory] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [minRating, setMinRating] = useState('')
  const [sort, setSort] = useState('')
  const [page, setPage] = useState(1)

  useEffect(() => {
    setPage(1)
  }, [title])

  useEffect(() => {
    dispatch(getproducts({
      title,
      category,
      minPrice,
      maxPrice,
      minRating,
      sort,
      page: String(page),
      limit: '12',
    }))
  }, [title, category, minPrice, maxPrice, minRating, sort, page, dispatch])

  const clearFilters = () => {
    setCategory('')
    setMinPrice('')
    setMaxPrice('')
    setMinRating('')
    setSort('')
    setPage(1)
  }

  return (
    <div className="relative left-1/2 right-1/2 w-screen -ml-[50vw] -mr-[50vw] px-5 py-5">

      <div className="mb-5">
        <h2 className="text-[15px] text-gray-800">
          Search Results for: <span className="font-semibold text-sky-700">"{title}"</span>
        </h2>
        {!loader && (
          <p className="text-[13px] text-gray-400 mt-0.5">{total} products found</p>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-5 items-start">

        {/* Sidebar - 20% width, flush left, fixed full height */}
        <aside className="w-full lg:w-1/5 min-w-0 lg:min-w-[200px] flex-shrink-0 bg-white rounded-lg border border-gray-200 static lg:sticky top-0 h-auto lg:h-screen overflow-y-auto">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <h3 className="font-semibold text-[13px] text-gray-800">Filters</h3>
            <button onClick={clearFilters} className="text-[12px] text-sky-600 hover:text-sky-800 font-medium">
              Clear all
            </button>
          </div>

          {/* Category */}
          <div className="px-4 py-4 border-b border-gray-100">
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide mb-2.5">Category</p>
            <div className="flex flex-col gap-2 max-h-40 overflow-y-auto pr-1">
              <label className="flex items-center gap-2 text-[13px] text-gray-700 cursor-pointer">
                <input
                  type="radio"
                  checked={category === ''}
                  onChange={() => { setCategory(''); setPage(1) }}
                  className="accent-sky-600 w-3.5 h-3.5"
                />
                All
              </label>
              {categories?.map((cat) => (
                <label key={cat} className="flex items-center gap-2 text-[13px] text-gray-700 capitalize cursor-pointer">
                  <input
                    type="radio"
                    checked={category === cat}
                    onChange={() => { setCategory(cat); setPage(1) }}
                    className="accent-sky-600 w-3.5 h-3.5"
                  />
                  {cat}
                </label>
              ))}
            </div>
          </div>

          {/* Price */}
          <div className="px-4 py-4 border-b border-gray-100">
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide mb-2.5">Price Range</p>
            <div className="flex items-center gap-1.5">
              <input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-2 py-1.5 text-[13px] focus:outline-none focus:border-sky-500"
              />
              <span className="text-gray-300 text-xs">—</span>
              <input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-2 py-1.5 text-[13px] focus:outline-none focus:border-sky-500"
              />
              <button
                onClick={() => setPage(1)}
                className="bg-sky-600 hover:bg-sky-700 text-white text-[12px] font-semibold px-3 py-1.5 rounded-md flex-shrink-0"
              >
                Go
              </button>
            </div>
          </div>

          {/* Rating */}
          <div className="px-4 py-4">
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide mb-2.5">Rating</p>
            <div className="flex flex-col gap-2">
              {[4, 3, 2, 1].map((r) => (
                <label key={r} className="flex items-center gap-2 text-[13px] cursor-pointer">
                  <input
                    type="radio"
                    checked={minRating === String(r)}
                    onChange={() => { setMinRating(String(r)); setPage(1) }}
                    className="accent-sky-600 w-3.5 h-3.5"
                  />
                  <span className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }, (_, i) => (
                      <FaStar key={i} className={i < r ? 'text-amber-400 text-[13px]' : 'text-gray-200 text-[13px]'} />
                    ))}
                  </span>
                  <span className="text-gray-500 text-[12px]">& Up</span>
                </label>
              ))}
              {minRating && (
                <button
                  onClick={() => { setMinRating(''); setPage(1) }}
                  className="text-[12px] text-sky-600 hover:underline text-left mt-1"
                >
                  Reset rating
                </button>
              )}
            </div>
          </div>
        </aside>

        {/* Results - 80% width */}
        <div className="w-full lg:w-4/5  flex-1 translate-y-0 lg:-translate-y-12">
          <div className="flex justify-end mb-4">
            <select
              value={sort}
              onChange={(e) => { setSort(e.target.value); setPage(1) }}
              className="border border-gray-300 rounded-md px-3 py-2 text-[13px] text-gray-700 focus:outline-none focus:border-sky-500"
            >
              <option value="">Sort: Newest</option>
              <option value="price">Price: Low to High</option>
              <option value="-price">Price: High to Low</option>
              <option value="-rating">Rating: High to Low</option>
            </select>
          </div>

          {loader ? (
            <Loader />
          ) : products.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-lg py-16 text-center text-gray-400 text-sm">
              No products found.
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {products.map((product: Product) => (
                  <ProductCard product={product} key={product._id} />
                ))}
              </div>

              {pageCount > 1 && (
                <div className="flex flex-wrap lg:flex-nowrap items-center justify-center gap-1.5 mt-8">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1.5 rounded-md border border-gray-300 text-[13px] text-gray-600 disabled:opacity-30 hover:bg-gray-50"
                  >
                    Prev
                  </button>

                  {Array.from({ length: pageCount }, (_, i) => i + 1).map((num) => (
                    <button
                      key={num}
                      onClick={() => setPage(num)}
                      className={`w-8 h-8 rounded-md text-[13px] font-semibold transition ${
                        currentPage === num
                          ? 'bg-sky-600 text-white'
                          : 'border border-gray-300 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {num}
                    </button>
                  ))}

                  <button
                    onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1.5 rounded-md border border-gray-300 text-[13px] text-gray-600 disabled:opacity-30 hover:bg-gray-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchResults