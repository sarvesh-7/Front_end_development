import React,{useContext} from 'react';
import classes from './Cart.module.css';
import CartList from './CartList';
import CartContext from '../store/CartContext';
import Button from '../UI/Button';
const Cart = (props)=>{
    
    const cartCtx = useContext(CartContext);

        const cartList = cartCtx.cartItems.map((element)=>{
            return <CartList key = {element.id} element={element}/>
        })
        
        
    return (
        <div className={classes.cart}>
            <Button onClick = {props.onHideCart} className={classes.close}>
               X
            </Button>
            <h2>Cart</h2>
            <div className={classes.heading}>
            <span>Item</span>
            <span>Price</span>
            <span>Quantity</span>
            </div>
            {cartList}
    <div className={classes.total}>Total ${cartCtx.amount}</div>
            <Button className={classes.purchase}>PURCHASE</Button>
        </div>
    )
};
export default Cart;