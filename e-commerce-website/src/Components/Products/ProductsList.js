import React,{useContext,useState} from 'react';
import classes from './ProductList.module.css';
import CartContext from '../store/CartContext';
const ProductsList = props =>{
    const cartCtx = useContext(CartContext);

    const[isProductAdded, setIsProductAdded] = useState(false);

    //remove product added to cart message
    const removeMessage = ()=>{
        setTimeout(()=>{
            setIsProductAdded(false);
        }, 2000);
    } 

    const addToCartHandler = e=>{
        setIsProductAdded(true);
        removeMessage();
        cartCtx.addItem(props.product);
    }
    return(
        <div className={classes.items}>
            <h3>{props.product.title}</h3>
            <div className={classes.imgWrapper}>
            <img src={props.product.imageUrl}/>
            </div>
            <div>
            <span>${props.product.price}</span>
            <button onClick = {addToCartHandler} className={classes.cart_action}>ADD TO CART</button>
            {isProductAdded && <div className = {classes.message}>
               Product : <b>{props.product.title}</b> added to the cart </div> }
            </div>
        </div>
    )
};
export default ProductsList;

