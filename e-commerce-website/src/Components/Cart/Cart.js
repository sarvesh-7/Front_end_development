import React,{useContext} from 'react';
import classes from './Cart.module.css';
import CartList from './CartList';
import CartContext from '../store/CartContext';
const Cart = (props)=>{
    
    const cartCtx = useContext(CartContext);

        const cartList = cartCtx.cartItems.map((element)=>{
            return <CartList key = {element.id} element={element}/>
        })
        
        
    return (
        <div className={classes.cart}>
            <button onClick = {props.onHideCart} className={classes.close}>
               X
            </button>
            <h2>Cart</h2>
            <div className={classes.heading}>
            <span>Item</span>
            <span>Price</span>
            <span>Quantity</span>
            </div>
            {cartList}
    <div className={classes.total}>Total ${cartCtx.amount}</div>
            <button className={classes.purchase}>PURCHASE</button>
        </div>
    )
};
export default Cart;