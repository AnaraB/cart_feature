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
      //mutate the state directly, immer library will do that behind the scene
      state.cartItems = [];
    },
    removeItem: (state, action)=> {
      //console.log(action);
      const itemId = action.payload
     state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
   //destructure payoload and pass it in as an argument
   increase: (state, { payload }) => {
    const cartItem = state.cartItems.find((item) => item.id === payload.id);
    cartItem.amount = cartItem.amount + 1;
   },
   decrease: ( state, { payload })=> {
    const cartItem = state.cartItems.find((item)=> item.id === payload.id);
    cartItem.amount = cartItem.amount - 1;
   }
  },
})

//console.log(cartSlice);
export const {clearCart, removeItem, increase, decrease} = cartSlice.actions;

export default cartSlice.reducer;