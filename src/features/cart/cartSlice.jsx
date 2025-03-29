import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
//import cartItems from '../../cartItems';
import axios from 'axios';
import { openModal } from '../modal/modalSlice';

const url = 'https://www.course-api.com/react-useReducer-cart-project';

const initialState = {
  cartItems: [],
  amount: 4,
  total:0,
  isLoading: true,

}

//------------------------------------------------------
//fetch() does not throw an error for HTTP errors like 404 or 500. It resolves the promise successfully as long as the network request itself was made. So, you need manually check the HTTP response status when fetch() is used 

// export const getCartItems = createAsyncThunk('cart/getCartItems', () => {
//   return fetch(url).then((response) => response.json()).catch((error) => console.log(error)) 
//   })
//-------------------------------------------------------

//use axios instead, it respondes with 404 response, access data with response.data
//payload must be the first param even if unused, second param thukAPI
export const getCartItems = createAsyncThunk('cart/getCartItems', async(payload, thunkAPI)=> {
  try {
  //console.log(thunkAPI);
  //console.log(thunkAPI.getState())
  //thunkAPI.dispatch(openModal());
  const response = await axios(url);
  return response.data
  }catch(error) {
   return thunkAPI.rejectWithValue('something went wrong');
  }
})

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
   },
   calculateTotals: (state) => {
    let amount = 0;
    let total = 0;
    state.cartItems.forEach((item) => {
      amount += item.amount;
      total += item.amount * item.price;
    });
    state.amount = amount;
    state.total = total;
   }
  },
  // builder callback notation, gives access to both the state and action

  extraReducers:(builder) => {
    builder
    .addCase(getCartItems.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getCartItems.fulfilled, (state, action) => {
      //console.log(action)
      state.isLoading = false;
      state.cartItems = action.payload;
    })
    .addCase(getCartItems.rejected, (state, action) => {
     //console.log(action)
      state.isLoading = false;
    });
  },
})

//console.log(cartSlice);
export const {clearCart, removeItem, increase, decrease, calculateTotals} = cartSlice.actions;

export default cartSlice.reducer;