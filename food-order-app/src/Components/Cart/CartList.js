import {useContext} from 'react';
import CartContext from '../../Store/CartContext';
import classes from './CartList.module.css';
const CartList = (props)=>{
    const cartCtx = useContext(CartContext);

    //add extra quantities from cart
    const addQty=(e, cartItem)=>{
        cartItem.quantity += 1;
        cartCtx.addItem(cartItem);
    }

    //remove quantities from cart
    const removeQty=(e,cartItem)=>{
        cartItem.quantity -= 1;
        //if quantity becomes 0 then remove the item from cart else change existing quantity
        if(cartItem.quantity === 0)
            cartCtx.removeItem(cartItem);
        else
        cartCtx.addItem(cartItem); 
    }
        return ( 
        <ul className={classes['cart-items']}>{cartCtx.cartItems.map((cartItem)=>(
        <li key={cartItem.id}>
        <div className={classes.li}>
        <div>
        <h3>{cartItem.title}</h3>
            <span className={classes.price}>${cartItem.price}</span>
            <span className={classes.qty}>X {cartItem.quantity}</span>
        </div>
        <div className={classes.actions}>
            <button className={classes.changeQty} onClick = {(e)=>{removeQty(e,cartItem)}}>-</button>
            <button className={classes.changeQty} onClick = {(e)=>{addQty(e,cartItem)}}>+</button>
        </div>
        </div>
        <hr/>
        </li>
        ))}
        </ul>
        )
}
export default CartList;