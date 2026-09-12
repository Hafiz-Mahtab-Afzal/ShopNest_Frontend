import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface newitems {
  _id: string;
  title: string;
  price: number;
  images: string[];
}

interface WishlistState {
  items: newitems[];
}

// ✅ localStorage se wishlist load karta hai (agar pehle se save hai to wahi use karo, warna khali array)
const getWishlistFromStorage = (): WishlistState => {
  const stored = localStorage.getItem('electro_wishlist');
  if (stored) {
    return JSON.parse(stored) as WishlistState;
  }
  return { items: [] };
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: getWishlistFromStorage(), // 👈 Refresh pe yahin se load hoga, khali nahi hoga
  reducers: {
    addToWishlist: (state, { payload }: PayloadAction<newitems>) => {
      const newItem = payload;
      const existingItem = state.items.find((item) => item._id === newItem._id);
      if (!existingItem) {
        state.items.push({
          _id: newItem._id,
          title: newItem.title,
          price: newItem.price,
          images: newItem.images,
        });
      }
      // ✅ Har change ke baad localStorage update karo
      localStorage.setItem('electro_wishlist', JSON.stringify(state));
    },

    removeFromWishlist: (state, { payload }: PayloadAction<string>) => {
      const id = payload;
      state.items = state.items.filter((item) => item._id !== id);
      // ✅ Remove hone ke baad localStorage se bhi turant hat jayega
      localStorage.setItem('electro_wishlist', JSON.stringify(state));
    },

    clearWishlist: (state) => {
      state.items = [];
      localStorage.setItem('electro_wishlist', JSON.stringify(state));
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;