import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
   // إضافة عنصر إلى السلة
   addItem: (state, action) => {
    const { name, image, cost } = action.payload;
    const existingItem = state.items.find(item => item.name === name);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      state.items.push({ name, image, cost, quantity: 1 });
    }
  },
  // تحديث كمية عنصر في السلة
  updateQuantity: (state, action) => {
    const { name, quantity } = action.payload;
    const existingItem = state.items.find(item => item.name === name);
    if (existingItem) {
      existingItem.quantity = quantity;
    }
  },
  // إزالة عنصر من السلة
  removeItem: (state, action) => {
    const name = action.payload;
    state.items = state.items.filter(item => item.name !== name);
  },
},
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
