import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'  
import { discountPriceCalc } from '../../functions/helper'

// Only the fields addToCart actually reads/writes — both a full Product
// and an existing CartItem (when increasing quantity) satisfy this shape.
interface AddToCartPayload {
  _id: string
  title: string
  price: number
  onSale: boolean
  discount: number
  images: string[]
}

interface CartItem {
  _id: string
  title: string
  price: number
  originalPrice:number
  discount: number
  onSale: boolean
  images: string[]    
  quantity:number
}

interface CartState {
  items: CartItem[]  
  totalQuantity: number
  shippingCharges: number
  saving: number
}

const getCartFromStorage = (): CartState => {
  const storedCart = localStorage.getItem('electro_cart')
  if (storedCart) {
    return JSON.parse(storedCart) as CartState  
  }
  return { items: [], totalQuantity: 0, shippingCharges: 0, saving: 0 }
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: getCartFromStorage(),
  reducers: {

    addToCart: (state, { payload }: PayloadAction<AddToCartPayload>) => {
      const newItem = payload
      const existingItem = state.items.find(item => item._id === newItem._id)
      state.totalQuantity++
      if (!existingItem) {
        state.items.push({
          _id: newItem._id,
          title: newItem.title,
          price: discountPriceCalc(newItem.onSale, newItem.discount, newItem.price),
          originalPrice: newItem.price,
          discount: newItem.discount,
          onSale: newItem.onSale,
          images: newItem.images,
          quantity: 1
        })
      } else {
        existingItem.quantity++
      }
      localStorage.setItem('electro_cart', JSON.stringify(state))
    },

    // ✅ PayloadAction<string> = payload sirf ek string hai (_id)
    removeFromCart: (state, { payload }: PayloadAction<string>) => {
      const existingItem = state.items.find(item => item._id === payload)
      if (!existingItem) return  
      state.totalQuantity--
      if (existingItem.quantity === 1) {
        state.items = state.items.filter(item => item._id !== payload)
      } else {
        existingItem.quantity--
      }
      localStorage.setItem('electro_cart', JSON.stringify(state))
    },

    updateQuantity: (state, { payload }: PayloadAction<{ id: string; quantity: number }>) => {
      const { id, quantity } = payload
      const existingItem = state.items.find(item => item._id === id)
      if (existingItem) {
        const quantityDiff = quantity - existingItem.quantity
        state.totalQuantity += quantityDiff
        if (quantity <= 0) {
          state.items = state.items.filter(item => item._id !== id)
        } else {
          existingItem.quantity = quantity
        }
      }
      localStorage.setItem('electro_cart', JSON.stringify(state))
    },

    removeItemComplete: (state, { payload }: PayloadAction<string>) => {
      const existingItem = state.items.find(item => item._id === payload)
      if (!existingItem) return  // ✅ null check
      state.totalQuantity -= existingItem.quantity
      state.items = state.items.filter(item => item._id !== payload)
      localStorage.setItem('electro_cart', JSON.stringify(state))
    },

    clearCart: (state) => {
      state.items = []
      state.totalQuantity = 0
      state.shippingCharges = 0
      state.saving = 0
      localStorage.setItem('electro_cart', JSON.stringify(state))
    },

    calculateCharges: (state, { payload }: PayloadAction<{ shippingCharges: number; saving: number }>) => {
      state.shippingCharges = payload.shippingCharges
      state.saving = payload.saving
      localStorage.setItem('electro_cart', JSON.stringify(state))
    }

  }
})

export const { addToCart, removeFromCart, removeItemComplete, clearCart, updateQuantity, calculateCharges } = cartSlice.actions
export default cartSlice.reducer