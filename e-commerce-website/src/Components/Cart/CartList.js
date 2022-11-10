import React from 'react';
import classes from './CartList.module.css';
const CartList = props => {
    return (
    <div className={classes.cartList}>
        <div className={classes.item}>
            <img className = {classes.img} src={props.element.imageUrl}/>
            <span>{props.element.title}</span>
        </div>
        <span className={classes.price}>{props.element.price}</span>
        <div className={classes.removeAction}>
        <input value={props.element.quantity} min='1' max='5'></input>
        <button >REMOVE</button>
        </div>
    </div>
    )
};
export default CartList;
