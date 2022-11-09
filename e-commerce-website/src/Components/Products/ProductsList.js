import React from 'react';
import classes from './ProductList.module.css';
const ProductsList = props =>{
    return(
        <div className={classes.items}>
            <h3>{props.product.title}</h3>
            <img src={props.product.imageUrl}/>
            <div>
            <span>${props.product.price}</span>
            <button className={classes.cart_action}>ADD TO CART</button>
            </div>
        </div>
    )
};
export default ProductsList;

