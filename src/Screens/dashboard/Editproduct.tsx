import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import apis from "../../config/apis"
import { errortoast, successtoast } from "../../toastify/toastify"

// ✅ Rule 1: interface — object ka blueprint
interface ProductForm {
  title: string
  subtitle: string
  brand: string
  category: string
  price: string
  description: string
}

const Editproduct = () => {

  // useParams se id aata hai — string ya undefined ho sakta hai
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  // ✅ Rule 2: useState ko type batao
  const [product, setproduct] = useState<ProductForm>({
    title: '',
    subtitle: '',
    brand: '',
    category: '',
    price: '',
    description: '',
  })
   
  // ✅ Rule 3: event ka type batao
  const changehandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const name = e.target.name
    const value = e.target.value
    setproduct({ ...product, [name]: value })
  }

  // ✅ Rule 4: form submit event ka type
  const submithandler = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      const { data } = await axios.put(`${apis.prod}/${id}`, product, {
        withCredentials: true
      })
      const { error, success } = data
      if (error) errortoast(error)
      if (success) {
        successtoast(success)
        setTimeout(() => {
          navigate("/Dashboard/product-list")
        }, 2000)
      }
    } catch (err: unknown) {
      console.log((err as Error).message)
    }
  }

  useEffect(() => {
    let isMounted = true

    const fetchproduct = async () => {
      try {
        const { data } = await axios.get(`${apis.prod}/${id}`, {
          withCredentials: true
        })
        const { title, subtitle, brand, category, price, description } = data.singleproduct
        if (isMounted) {
          setproduct({ title, subtitle, brand, category, price, description })
        }
      } catch (err: unknown) {
        if (isMounted) {
          console.log((err as Error).message)
        }
      }
    }

    fetchproduct()

    return () => {
      isMounted = false
    }
  }, [id])

  return (
    <div className="flex items-center justify-center px-4 pt-16 pb-4 lg:p-6">
      <form onSubmit={submithandler} className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-5 lg:p-8">
        <h2 className="text-2xl font-bold mb-8 text-center">Edit Product</h2>

        {/* Title */}
        <label className="block mb-4">
          <span className="text-base font-bold text-slate-700">Title</span>
          <input
            name="title"
            value={product.title}
            onChange={changehandler}
            placeholder="Enter product title"
            className="w-full mt-2 px-4 py-[10px] rounded border border-gray-300 hover:outline-none hover:ring-2 hover:ring-rose-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        {/* Subtitle */}
        <label className="block mb-4">
          <span className="text-base font-bold text-slate-700">SubTitle</span>
          <input
            name="subtitle"
            value={product.subtitle}
            onChange={changehandler}
            placeholder="Enter product subtitle"
            className="w-full mt-2 px-4 py-[10px] rounded border border-gray-300 hover:outline-none hover:ring-2 hover:ring-rose-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        <div className="flex flex-col sm:flex-row gap-4 mb-4">

          {/* Brand */}
          <label className="flex-1">
            <span className="text-base font-bold text-slate-700">Brand</span>
            <input
              name="brand"
              value={product.brand}
              onChange={changehandler}
              placeholder="Brand"
              className="w-full mt-2 px-4 py-2 rounded border border-gray-300 hover:outline-none hover:ring-2 hover:ring-rose-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>

          {/* Category */}
          <label className="flex-1">
            <span className="text-base font-bold text-slate-700">Category</span>
            <select
              name="category"
              value={product.category}
              onChange={changehandler}
              className="w-full mt-2 px-2 py-2 rounded border border-gray-300 hover:outline-none hover:ring-2 hover:ring-rose-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select category</option>
              <option value="Electronics">dresses</option>
              <option value="Clothing">shoes</option>
            </select>
          </label>

          {/* Price */}
          <label className="flex-1">
            <span className="text-base font-bold text-slate-700">Price</span>
            <input
              name="price"
              value={product.price}
              onChange={changehandler}
              placeholder="Price"
              className="w-full mt-2 px-4 py-2 rounded border border-gray-300 hover:outline-none hover:ring-2 hover:ring-rose-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>

        </div>

        {/* Description */}
        <label className="block mb-4">
          <span className="text-base font-bold text-slate-700">Description</span>
          <textarea
            name="description"
            value={product.description}
            onChange={changehandler}
            placeholder="Enter product description..."
            rows={4}
            className="w-full mt-2 px-4 py-2 rounded border text-lg border-gray-300 hover:outline-none hover:ring-2 hover:ring-rose-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded font-semibold hover:opacity-90 transition"
        >
          Update Product
        </button>

      </form>
    </div>
  )
}

export default Editproduct