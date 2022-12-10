import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import {useSelector,useDispatch} from 'react-redux';
import {useEffect} from 'react';
import {UiAction} from './store/Ui';
import Notification from './components/UI/Notification';
import {sendCartData,getCartData} from './store/Cart';

function App() {

  const dispatch = useDispatch();
  const isVisible = useSelector((state)=>state.cart.isVisible);
  const cart = useSelector((state)=>state.cart.cartItems);
  const notification = useSelector((state)=>state.UI.notification);

  useEffect(()=>{

    if(cart.length > 0)
    {
      console.log(cart);
      dispatch(sendCartData(cart));
    }
    else{
      dispatch(getCartData());
    }
  },[cart,dispatch]);
  
  return (
   
    <Layout>
      {
          notification &&
          <Notification status={notification.status}
          title={notification.title}
          message={notification.message}
          />
      }
      {
        isVisible && <Cart />
      }
      <Products />
    </Layout>
  );
}

export default App;
