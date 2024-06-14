import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const loadCartFromLocalStorage = () => {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
};

const saveCartToLocalStorage = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

export const cartSlice = createSlice({
  name: 'cartSlice',
  initialState: loadCartFromLocalStorage(),
  reducers: {
    addToCart: (state, action) => {
      const { id } = action.payload;
      const existingProduct = state.find((product) => product.id === id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
      saveCartToLocalStorage(state);
      toast.success("The item has been added successfully");
    },
    deleteFromCart: (state, action) => {
      const { id } = action.payload;
      const existingProduct = state.find((product) => product.id === id);
      if (existingProduct.quantity > 1) {
        existingProduct.quantity -= 1;
      } else {
        const updatedCart = state.filter((product) => product.id !== id);
        state.splice(0, state.length, ...updatedCart);
      }
      saveCartToLocalStorage(state);
    },
    clear: (state) => {
      if (state.length === 0) {
        toast.error("The cart is already empty");
      } else {
        state.splice(0, state.length);
        saveCartToLocalStorage(state);
      }
    },
    addItemToCart: (state, action) => {
      const { id } = action.payload;
      const existingProduct = state.find((product) => product.id === id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
      saveCartToLocalStorage(state);
      toast.success("The item has been added successfully");
    },
  },
});

export const { addToCart, deleteFromCart, clear, addItemToCart } = cartSlice.actions;
export default cartSlice.reducer;


