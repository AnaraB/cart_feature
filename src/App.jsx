import Navbar from './components/Navbar';
import Modal from './components/Modal';
import CartContainer from './components/CartContainer';
import { calculateTotals, getCartItems } from './features/cart/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch();
  const {cartItems, isLoading} = useSelector((store) => store.cart)
  const {isOpen} = useSelector((store) => store.modal)
  
  //invoke useEffect every time there is a change in cartItems array
  useEffect(()=> {
    dispatch(calculateTotals())

  }, [cartItems])
    //invoke useEffect only when app loads
    useEffect(()=> {
      dispatch(getCartItems())
    }, [])

    if(isLoading){
      return (
        <div className='loading'>
          <h1>Loading ...</h1>
        </div>
      )
    }
  return  (
    <main>
       <Navbar/>
       <CartContainer/>
       {isOpen && <Modal />}
    </main>

  )
}
export default App;
