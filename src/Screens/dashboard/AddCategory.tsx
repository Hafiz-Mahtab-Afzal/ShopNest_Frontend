import axios from 'axios'
import { useState } from 'react'
import apis from '../../config/apis'
import { errortoast, successtoast } from '../../toastify/toastify'
import { useNavigate } from 'react-router-dom'
import type { AuthResponse } from '../auth/Signup'
import { MdCategory } from 'react-icons/md'

const AddCategory = () => {

  const navigate = useNavigate()
  const [category, setCategory] = useState<string>("")
  
  const submithandler = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      const { data } = await axios.post<AuthResponse>(`${apis.prod}/category`, { category }, {
        withCredentials: true
      })
      const { error, success } = data
      if (error) errortoast(error)
      if (success) {
        successtoast(success)
        setTimeout(() => {
          navigate("/dashboard/product-list")
        }, 2000)
      }
    } catch (err: unknown) {
      console.log((err as Error).message)
    }
  }

  return (
    <div className="flex justify-center items-center px-4 lg:px-0 pt-16 lg:pt-28">
      <div className="w-full max-w-2xl rounded-2xl overflow-hidden shadow-lg">

        {/* Header */}
        <div className="bg-blue-600 px-4 lg:px-8 py-7 text-center">
          <h2 className="text-white text-2xl font-bold">Add Category</h2>
          <p className="text-white/70 text-sm mt-1">Enter a new category name below</p>
        </div>

        {/* Form */}
        <form onSubmit={submithandler} className="bg-white px-4 lg:px-8 py-7 flex flex-col gap-3">

          {/* Category Input */}
          <div className="flex items-center gap-2 bg-blue-50 rounded-xl px-4 py-3">
            <MdCategory className="text-blue-600 text-lg shrink-0" />
            <input
              name="category"
              value={category}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCategory(e.target.value)}
              placeholder="Category Name"
              className="bg-transparent w-full text-sm text-gray-700 placeholder-gray-400 outline-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-900 text-white py-3 rounded-xl font-semibold text-sm hover:bg-blue-800 transition-colors"
          >
            Add Category
          </button>

        </form>
      </div>
    </div>
  )
}

export default AddCategory