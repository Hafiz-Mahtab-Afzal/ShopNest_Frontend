import { combineReducers, configureStore } from '@reduxjs/toolkit'
import productSlice from './slices/productSlice'
import wishlistSlice from './slices/wishlistSlice'
import cartSlice from './slices/cartSlice'

const reducer = combineReducers({
    productSlice,
    wishlistSlice,
    cartSlice
    
})

const store = configureStore({ reducer })
                      
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export default store