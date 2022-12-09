import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import {useSelector} from 'react-redux';

const Cart = (props) => {

  //get total cart items
  const cartItems = useSelector((state)=>state.cart.cartItems);

  //component which will display all cart items
  const cartItemsComp  = cartItems.map((item)=>{
    return <CartItem key = {item.key}
    item={{ title: item.title, quantity: item.quantity, total: item.price * item.quantity, price: item.price }}
  />
  })

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {cartItemsComp}
      </ul>
    </Card>
  );
};

export default Cart;
