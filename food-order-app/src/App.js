import Header from './Components/Layout/Header';
import Summary from './Components/Meals/Summary';
import Meals from './Components/Meals/Meals';
import Cart from './Components/Cart/Cart';
import {useState} from 'react';
import CartContextProvider from './Store/CartContextProvider';

function App() {
  const [isCartShown, setIsCartShown] = useState(false);

  //show cart when clicked on cart button
  const showCartHandler = e =>{
    setIsCartShown(true);
  };

  //hide cart when clicked on close button or backdrop
  const hideCartHandler = e =>{
    setIsCartShown(false);
  }
  return (
    <CartContextProvider>
      <Header onShowCart = {showCartHandler}/>
      {isCartShown && <Cart onHideCart = {hideCartHandler}/>}
      <Summary/>
      <Meals/>
    </CartContextProvider>
  );
}

export default App;