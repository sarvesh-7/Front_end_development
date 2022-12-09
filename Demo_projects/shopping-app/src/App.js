import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import {useSelector,useDispatch} from 'react-redux';
import {useEffect} from 'react';
import {UiAction} from './store/Ui';
import Notification from './components/UI/Notification';

function App() {

  const dispatch = useDispatch();
  const isVisible = useSelector((state)=>state.cart.isVisible);
  const cart = useSelector((state)=>state.cart.cartItems);
  const notification = useSelector((state)=>state.UI.notification);

  useEffect(()=>{

    if(cart.length > 0)
    {
      console.log(cart);
    //set notification to sending request to the server
    dispatch(UiAction.showNotification({
      status : 'pending',
      title : 'Sending...',
      message : 'Sending cart data!'
    }))

    async function fetchCartData()
    {
      try
      {
      const res = await fetch('https://shopping-app-5eb89-default-rtdb.firebaseio.com/cart.json',
      {
        method:'PUT',
        body:JSON.stringify(cart),
      });

      if(!res.ok){
         //set notification to request failed
          dispatch(UiAction.showNotification({
            status : 'error',
            title : 'Error!',
            message : 'Sending cart data!'
          }))
      }
      else{
        //set notification requst successfully sent
        dispatch(UiAction.showNotification({
          status : 'success',
          title : 'Success!',
          message : 'Cart data sent successfully!'
        }))      
      }
    }
    catch(error){
      dispatch(UiAction.showNotification({
        status : 'success',
        title : 'Success!',
        message : 'Cart data sent successfully!'
      })) 
    }
    };
    fetchCartData(); 
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
