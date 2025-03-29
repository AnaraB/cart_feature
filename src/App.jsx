import Navbar from './components/Navbar';
import Modal from './components/Modal';
import CartContainer from './components/CartContainer';
import { calculateTotals } from './features/cart/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch();
  const {cartItems} = useSelector((store) => store.cart)
  
  //invoke useEffect every time there is a change in cartItems array
  useEffect(()=> {
    dispatch(calculateTotals())

  }, [cartItems])
  return  (
    <main>
       <Navbar/>
       <CartContainer/>
       <Modal />
    </main>

  )
}
export default App;
