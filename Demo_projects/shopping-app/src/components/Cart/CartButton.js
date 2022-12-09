import classes from './CartButton.module.css';
import {useDispatch} from 'react-redux';
import {cartAction} from '../../store/Cart';

const CartButton = (props) => {
  const dispatch = useDispatch();

  //toggle cart functionality
  const cartToggleHandler=()=>{
    dispatch(cartAction.toggleCart());
  }

  return (
    <button className={classes.button} onClick={cartToggleHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>1</span>
    </button>
  );
};

export default CartButton;
