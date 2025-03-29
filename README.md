# Redux Toolkit

This project is a practical example of implementing a cart feature using Redux Toolkit. 

#### Docs

[Redux Toolkit Docs](https://redux-toolkit.js.org/introduction/getting-started)

#### Install Template

```
npm create vite@latest my-app --template react
cd my-app
npm install @reduxjs/toolkit react-redux

```

#### Existing App

```
npm install @reduxjs/toolkit react-redux
```

#### @reduxjs/toolkit

consists of few libraries

- redux (core library, state management)
- immer (allows to mutate state)
- redux-thunk (handles async actions)
- reselect (simplifies reducer functions)

#### Extras

- redux devtools
- combine reducers

#### react-redux

connects our app to redux

#### Setup Store

- create store.js

```js
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {},
});
```

#### Setup Provider

#### Setup Cart Slice

- application feature
- create features folder/cart
- create cartSlice.js


#### Redux DevTools

- extension

#### Access store value

#### Hero Icons

- [Hero Icons](https://heroicons.com/)

```css
nav svg {
  width: 40px;
  color: var(--clr-white);
}
```

#### Setup Cart

- create CartContainer.js and CartItem.jsx
- CartContainer.jsx
- CartItem.jsx

#### First Reducer

- cartSlice.js
- Immer library

- create action
- CartContainer.js

#### Remove, Increase, Decrease Items

#### Modal

#### modal slice

#### toggle modal

#### async functionality with createAsyncThunk

- [Course API from John Smilga](https://www.course-api.com/)
- https://www.course-api.com/react-useReducer-cart-project
- cartSlice.js

- action type
- callback function
- lifecycle actions


#### Options

- cartSlice.js

```js
export const getCartItems = createAsyncThunk(
  'cart/getCartItems',
  async (name, thunkAPI) => {
    try {
      // console.log(name);
      // console.log(thunkAPI);
      // console.log(thunkAPI.getState());
      // thunkAPI.dispatch(openModal());
      const resp = await axios(url);

      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('something went wrong');
    }
  }
);
```

#### The extraReducers "builder callback" notation

cart/cartSlice

```js
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // reducers
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        // console.log(action);
        state.isLoading = false;
        state.cartItems = action.payload;
      })
      .addCase(getCartItems.rejected, (state, action) => {
        console.log(action);
        state.isLoading = false;
      });
  },
});
```

