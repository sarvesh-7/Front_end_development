import classes from './CartButton.module.css';
import {useDispatch,useSelector} from 'react-redux';
import {cartAction} from '../../store/Cart';

const CartButton = (props) => {
  const dispatch = useDispatch();
  const products = useSelector((state)=>state.cart.cartItems);
  let totalCount = 0;

  //count all products from the cart and show the count on My cart button
    products.forEach(product => {
      totalCount += product.quantity;
    });

  //toggle cart functionality
  const cartToggleHandler=()=>{
    dispatch(cartAction.toggleCart());
  }

  return (
    <button className={classes.button} onClick={cartToggleHandler}>
      <span>My Cart</span>
  <span className={classes.badge}>{totalCount}</span>
    </button>
  );
};

export default CartButton;
