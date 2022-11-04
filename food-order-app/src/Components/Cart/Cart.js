import classes from './Cart.module.css';
import Modal from '../UI/Modal';
const Cart = (props) => {
    const cartItems = [{
            id: 'M1',
            title: 'Sushi',
            desc: 'Finest fish and veggies',
            price: 22.99
        }];
        const cartTotalComp =  <ul className={classes['cart-items']}>{cartItems.map((cartItem)=>(
            <li>{cartItem.title}</li>
        ))}</ul>

        return(
            <Modal onClose = {props.onHideCart}>
            {cartTotalComp}
            <div className = {classes.total}>
                <div>Total Amount</div>
                <div>35.62</div>
            </div>
            <div className = {classes.actions}>
                <button onClick = {props.onHideCart} className={classes['button--alt']}>Close</button>
                <button className={classes.button}>Order</button>
            </div>
            </Modal>
        )
}
export default Cart;
