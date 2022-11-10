import React,{useContext} from 'react';
import classes from './CartList.module.css';
import CartContext from '../store/CartContext';
const CartList = props => {
    const cartCtx = useContext(CartContext);
    const removeItemHandler = e=>{
        cartCtx.removeItem(props.element);
    }
    return (
    <div className={classes.cartList}>
        <div className={classes.item}>
            <img className = {classes.img} src={props.element.imageUrl}/>
            <span>{props.element.title}</span>
        </div>
        <span className={classes.price}>{props.element.price}</span>
        <div className={classes.removeAction}>
        <input value={props.element.quantity} min='1' max='5' readOnly></input>
        <button onClick={removeItemHandler} >REMOVE</button>
        </div>
    </div>
    )
};
export default CartList;
