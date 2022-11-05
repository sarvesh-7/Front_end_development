import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import {useContext} from 'react';
import CartContext from '../../Store/CartContext';

const Cart = (props) => {
    const cartCtx = useContext(CartContext);
        const cartTotalComp =  <ul className={classes['cart-items']}>{cartCtx.cartItems.map((cartItem)=>(
        <li className={classes.li}>
        <span>Title : {cartItem.title}</span>
        <span>
            {cartItem.quantity} X {cartItem.price}
            = {cartItem.quantity*cartItem.price}
        </span>
        </li>
        ))}</ul>

        return(
            <Modal onClose = {props.onHideCart}>
            {cartTotalComp}
            <div className = {classes.total}>
                <div>Total Amount</div>
            <div>{cartCtx.amount}</div>
            </div>
            <div className = {classes.actions}>
                <button onClick = {props.onHideCart} className={classes['button--alt']}>Close</button>
                <button className={classes.button}>Order</button>
            </div>
            </Modal>
        )
}
export default Cart;
