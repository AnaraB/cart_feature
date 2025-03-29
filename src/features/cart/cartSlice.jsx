import { createSlice } from '@reduxjs/toolkit';
import cartItems from '../../cartItems';

const initialState = {
  cartItems: cartItems,
  amount: 4,
  total:0,
  isLoading: true,

}


const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart:(state)=>{
      //mutate the state directly, immer library will take care of that
      state.cartItems = [];
    },
  },
})

//console.log(cartSlice);
export const {clearCart} = cartSlice.actions;

export default cartSlice.reducer;