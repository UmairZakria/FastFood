import { configureStore } from '@reduxjs/toolkit'
import cartSlice from '../cart/cartSlice'
import UserSlice from '../user/UserSlice'
export const store = configureStore({
  reducer: {
    user : UserSlice,
    cart : cartSlice
  }
})