import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async action to fetch products
export const fetchProducts = createAsyncThunk('cart/fetchProducts', async () => {
  const response = await axios.get('http://localhost:3001/getproducts');
  return response.data; // Return the data
});

// Initial state
const initialState = {
  cart: [],
  items: [], // Initially an empty array
  totalPrice: 0,
  status: 'idle', // Status to handle loading, success, and error
  error: null,
};

// Create the slice
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addtocart: (state, action) => {
      let find = state.cart.findIndex((item) => item._id === action.payload.id);
      if (find >= 0) {
        state.cart[find].quantity += 1;
      } else {
        state.cart.push(action.payload);
      }
      state.totalPrice = state.cart.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);
    },

    removeitem: (state, action) => {
      state.cart = state.cart.filter((item) => item._id !== action.payload);
      state.totalPrice = state.cart.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);
    },
    changeQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      let find = state.cart.find((item) => item._id === id);
      if (find) {
        find.quantity = quantity;
      }
      state.totalPrice = state.cart.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading'; // Set status to loading
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded'; // Set status to succeeded
        state.items = action.payload; // Update items with fetched data
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed'; // Set status to failed
        state.error = action.error.message; // Capture error message
      });
  },
});

// Action creators are generated for each case reducer function
export const { addtocart, removeitem, changeQuantity } = cartSlice.actions;

export default cartSlice.reducer;
