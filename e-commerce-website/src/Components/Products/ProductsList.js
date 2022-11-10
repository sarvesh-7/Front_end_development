import React,{useContext,useRef} from 'react';
import classes from './ProductList.module.css';
import CartContext from '../store/CartContext';
const ProductsList = props =>{
    const cartCtx = useContext(CartContext);

    const addToCartHandler = e=>{
        cartCtx.addItem(props.product);
    }
    return(
        <div className={classes.items}>
            <h3>{props.product.title}</h3>
            <img src={props.product.imageUrl}/>
            <div>
            <span>${props.product.price}</span>
            <button onClick = {addToCartHandler} className={classes.cart_action}>ADD TO CART</button>
            </div>
        </div>
    )
};
export default ProductsList;

