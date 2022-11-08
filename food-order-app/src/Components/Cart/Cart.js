import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import {useContext} from 'react';
import CartContext from '../../Store/CartContext';
import CartList from './CartList';

const Cart = (props) => {
    const cartCtx = useContext(CartContext);
        return(
            <Modal onClose = {props.onHideCart}>
            <CartList/>
            <div className = {classes.total}>
                <div>Total Amount</div>
            <div>${cartCtx.amount}</div>
            </div>
            <div className = {classes.actions}>
                <button onClick = {props.onHideCart} className={classes['button--alt']}>Close</button>
                <button className={classes.button}>Order</button>
            </div>
            </Modal>
        )
}
export default Cart;
