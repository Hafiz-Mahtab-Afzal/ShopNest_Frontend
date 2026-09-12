import { useRef, useState } from 'react'
import { FaSearch } from "react-icons/fa"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import apis from '../../config/apis'

const Searchbar = () => {
  const navigate = useNavigate()
  const [input, setInput] = useState('')
  const [suggestions, setSuggestions] = useState<{ _id: string; title: string }[]>([])
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const changehandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInput(value)
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(async () => {
      if (value.trim() === '') return setSuggestions([])
      try {
        const { data } = await axios.get(`${apis.prod}?title=${value}`)
        setSuggestions(data.products?.slice(0, 6) || [])
      } catch {
        setSuggestions([])
      }
    }, 400)
  }

  const submithandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (input.trim() === '') return
    setSuggestions([])
    setInput('')
    navigate(`/search?title=${input}`)
  }

  return (
    <div className='w-full h-[50px] bg-[#e5e5e5] rounded-[5px] relative p-2'>
      <form onSubmit={submithandler} className='flex items-center'>
        <input
          type="text"
          autoComplete='off'
          value={input}
          onChange={changehandler}
          onBlur={() => setTimeout(() => setSuggestions([]), 150)}
          placeholder='Search for product'
          className='w-full h-[35px] focus:outline-none bg-inherit px-3 text-[16px] placeholder:text-gray-500'
        />
        <button
          type="submit"
          className='absolute right-[5px] top-[8px] w-[37px] h-[37px] rounded-full flex items-center justify-center hover:bg-gray-300 transition'
        >
          <FaSearch className='text-[#525252] text-xl' />
        </button>
      </form>

      {suggestions.length > 0 && (
        <div className='absolute top-[54px] left-0 w-full bg-white shadow-lg rounded-md' style={{ zIndex: 99999 }}>
          {suggestions.map(product => (
            <div
              key={product._id}
              onMouseDown={() => {
                setSuggestions([])
                setInput('')
                navigate(`/search?title=${product.title}`)
              }}
              className='px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-3'
            >
              <FaSearch className='text-gray-400 text-sm' />
              <span className='text-sm'>{product.title}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Searchbar
