import classes from './CartItem.module.css';
import {useDispatch,useSelector} from 'react-redux';
import {cartAction} from '../../store/Cart';

const CartItem = (props) => {
  const { title, quantity, total, price } = props.item;

  const dispatch = useDispatch();
  

  //increase Quanity for the item
  const increaseQtyHandler=()=>{
    dispatch(cartAction.addItems(props.item));
  };

  //decrease quantity for the item
  const decreaseQtyHandler=()=>{
    dispatch(cartAction.removeItems(props.item));
  };

  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}{' '}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick = {decreaseQtyHandler}>-</button>
          <button onClick= {increaseQtyHandler}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
