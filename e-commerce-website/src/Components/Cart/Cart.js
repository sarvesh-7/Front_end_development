import React from 'react';
import classes from './Cart.module.css';
import CartList from './CartList';
const Cart = (props)=>{
    const cartElements = [
        {
        title: 'Colors',
        price: 100,
        imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%201.png',
        quantity: 2,
        },
        
        {
        title: 'Black and white Colors',
        price: 50,
        imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%202.png',
        quantity: 3,
        },
        
        {
        title: 'Yellow and Black Colors',
        price: 70,
        imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%203.png',
        quantity: 1,
        }
        ]

        const cartList = cartElements.map((element)=>{
            return <CartList element={element}/>
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
            <div className={classes.total}>Total $0</div>
            <button className={classes.purchase}>PURCHASE</button>
        </div>
    )
};
export default Cart;