import React,{useContext,useState} from 'react';
import classes from './ProductList.module.css';
import CartContext from '../store/CartContext';
import Message from '../Message/Message';
import Button from '../UI/Button';
import {Link} from 'react-router-dom';
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
        //add same products upto 5 quantities
        if (cartCtx.addItem(props.product, cartCtx.email))
        {
            setIsProductAdded(true);
            removeMessage();
        }  
    }
    return(
        <div className={classes.items}>
            <h3>{props.product.title}</h3>
            <div className={classes.imgWrapper}>
            <Link to={{ pathname : `store/${props.product.title}`, state:{item : props.product}}} >
            <img src={props.product.imageUrl} type='image/webp'/>
            </Link>
            </div>
            <div>
            <span>${props.product.price}</span>
            <Button onClick = {addToCartHandler} className={classes.cart_action}>ADD TO CART</Button>
            {isProductAdded && <Message>
               Product : <b>{props.product.title}</b> added to the cart </Message> }
            </div>
        </div>
    )
};
export default ProductsList;

