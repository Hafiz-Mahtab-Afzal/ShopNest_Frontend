import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import type { AuthResponse } from '../auth/Signup';
import { errortoast, successtoast } from '../../toastify/toastify';
import apis from '../../config/apis';
import {
  MdOutlineTitle,
  MdSubtitles,
  MdStorefront,
  MdCategory,
  MdAttachMoney,
  MdNotes,
  MdKeyboardArrowDown,
} from 'react-icons/md';

interface Product {
  title: string;
  subtitle: string;
  brand: string;
  category: string;
  price: string;
  discription: string;
}

const AddProduct = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState<File[]>([]);   // ✅ Ab array hai, single File nahi
  const [categories, setCategories] = useState<string[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [product, setproduct] = useState<Product>({
    title: '',
    subtitle: '',
    brand: '',
    category: '',
    price: '',
    discription: '',
  });

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    axios
      .get(`${apis.prod}/category`, {
        withCredentials: true
      })
      .then(({ data }) => {
        const names = data.categories.map((cat: { category_name: string }) => cat.category_name);
        setCategories(names);
      })
      .catch((err) => console.log(err));
  }, []);

  const changehandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setproduct({ ...product, [e.target.name]: e.target.value });
  };

  // ✅ Ab saari selected files array mein store hoti hain (max 5, backend limit se match)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files).slice(0, 5); // max 5 images
      setImages(selectedFiles);
    }
  };

  const submithandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (images.length === 0) {
      errortoast('Kam az kam ek image chunein');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', product.title);
      formData.append('subtitle', product.subtitle);
      formData.append('brand', product.brand);
      formData.append('category', product.category);
      formData.append('price', product.price);
      formData.append('discription', product.discription);

      // ✅ Saari images ko loop kar ke same key 'images' se append karna hai
      images.forEach((file) => {
        formData.append('images', file);
      });

      const { data } = await axios.post<AuthResponse>(`${apis.prod}`, formData, {
        withCredentials: true
      });
      const { error, success } = data;
      if (error) errortoast(error);
      if (success) {
        successtoast(success);
        setTimeout(() => navigate('/Dashboard/product-list'), 2000);
      }
    } catch (err: unknown) {
      console.log((err as Error).message);
    }
  };

  return (
    <div className="flex justify-center items-center px-4 lg:px-0 pt-16 lg:pt-28">
      <div className="w-full max-w-2xl rounded-2xl overflow-hidden shadow-lg">

        <div className="bg-blue-600 px-4 lg:px-8 py-7 text-center">
          <h2 className="text-white text-2xl font-bold">Add Product</h2>
          <p className="text-white/70 text-sm mt-1">Fill in your product details below</p>
        </div>

        <form onSubmit={submithandler} className="bg-white px-4 lg:px-8 py-7 flex flex-col gap-3">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-center gap-2 bg-blue-50 rounded-xl px-4 py-3">
              <MdOutlineTitle className="text-blue-600 text-lg shrink-0" />
              <input
                name="title"
                value={product.title}
                onChange={changehandler}
                placeholder="Title"
                className="bg-transparent w-full text-sm text-gray-700 placeholder-gray-400 outline-none"
              />
            </div>
            <div className="flex items-center gap-2 bg-blue-50 rounded-xl px-4 py-3">
              <MdSubtitles className="text-blue-600 text-lg shrink-0" />
              <input
                name="subtitle"
                value={product.subtitle}
                onChange={changehandler}
                placeholder="Subtitle"
                className="bg-transparent w-full text-sm text-gray-700 placeholder-gray-400 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

            <div className="flex items-center gap-2 bg-blue-50 rounded-xl px-4 py-3">
              <MdStorefront className="text-blue-600 text-lg shrink-0" />
              <input
                name="brand"
                value={product.brand}
                onChange={changehandler}
                placeholder="Brand"
                className="bg-transparent w-full text-sm text-gray-700 placeholder-gray-400 outline-none"
              />
            </div>

            <div className="relative" ref={dropdownRef}>
              <div
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center justify-between gap-2 bg-blue-50 rounded-xl px-4 py-3 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <MdCategory className="text-blue-600 text-lg shrink-0" />
                  <span className={`text-sm ${product.category ? 'text-gray-700' : 'text-gray-400'}`}>
                    {product.category || 'Category'}
                  </span>
                </div>
                <MdKeyboardArrowDown
                  className={`text-blue-600 text-lg transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
                />
              </div>

              {dropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-lg border border-blue-100 z-100 overflow-hidden">
                  {categories.map((cat: string) => (
                    <div
                      key={cat}
                      onClick={() => {
                        setproduct({ ...product, category: cat });
                        setDropdownOpen(false);
                      }}
                      className={`px-4 py-2.5 text-sm cursor-pointer hover:bg-blue-50 transition-colors
                        ${product.category === cat ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'}`}
                    >
                      {cat}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 bg-blue-50 rounded-xl px-4 py-3">
              <MdAttachMoney className="text-blue-600 text-lg shrink-0" />
              <input
                name="price"
                value={product.price}
                onChange={changehandler}
                placeholder="Price"
                className="bg-transparent w-full text-sm text-gray-700 placeholder-gray-400 outline-none"
              />
            </div>
          </div>

          <div className="flex items-start gap-2 bg-blue-50 rounded-xl px-4 py-3">
            <MdNotes className="text-blue-600 text-lg shrink-0 mt-1" />
            <textarea
              name="discription"
              value={product.discription}
              onChange={changehandler}
              placeholder="discription"
              rows={3}
              className="bg-transparent w-full text-sm text-gray-700 placeholder-gray-400 outline-none resize-none"
            />
          </div>

          {/* Image Upload */}
          <div className="border-2 border-dashed border-blue-200 rounded-xl p-4 bg-blue-50 flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <label className="cursor-pointer bg-blue-600 text-white text-xs px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Choose Images
                <input
                  type="file"
                  accept="image/*"
                  name="images"
                  className="hidden"
                  multiple
                  onChange={handleImageChange}
                />
              </label>
              <span className="text-sm text-gray-500">
                {images.length > 0 ? `${images.length} image(s) selected` : 'No file chosen'}
              </span>
            </div>

            {/* ✅ Selected images ke naam dikhana (confirm karne ke liye kitni select hui hain) */}
            {images.length > 0 && (
              <ul className="text-xs text-gray-500 list-disc list-inside">
                {images.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-900 text-white py-3 rounded-xl font-semibold text-sm hover:bg-blue-800 transition-colors"
          >
            Add Product
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddProduct;