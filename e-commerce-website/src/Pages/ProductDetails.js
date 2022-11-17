import React,{useState,useContext} from 'react';
import {useParams,useLocation} from 'react-router-dom';
import classes from './ProductDetails.module.css';
import Message from '../Components/Message/Message';
import Button from '../Components/UI/Button';
import CartContext from '../Components/store/CartContext';
import ProductReviews from './ProductReviews';

const ProductDetails = props=>{
    const cartCtx = useContext(CartContext);
    const prodLocation = useLocation();
    const { item } = prodLocation.state;
    console.log(item);
    const productImages = {
        Shoes : 
            {
                img1 : '\\Assets\\Shoes\\shoes-main.webp',
                img2 : '\\Assets\\Shoes\\shoes-left.webp',
                img3 : '\\Assets\\Shoes\\shoes-front-back.webp',
                img4 : '\\Assets\\Shoes\\shoes-top-bottom.webp'
            },
        Smartwatch : {
                img1 : '\\Assets\\Watch\\watch-main.webp',
                img2 : '\\Assets\\Watch\\watch-faces.webp',
                img3 : '\\Assets\\Watch\\watch-features.webp',
                img4 : '\\Assets\\Watch\\watch-weight.webp',
        },
        Airpods : {
            img1 : '\\Assets\\Airpods\\Airpods-main.webp',
            img2 : '\\Assets\\Airpods\\Airpods2.webp',
            img3 : '\\Assets\\Airpods\\Airpods3.webp',
            img4 : '\\Assets\\Airpods\\Airpods4.webp'
        },
        Wallet : {
            img1 : '\\Assets\\Wallet\\wallet-main.webp',
            img2 : '\\Assets\\Wallet\\wallet-features.webp',
            img3 : '\\Assets\\Wallet\\wallet-top.webp',
            img4 : '\\Assets\\Wallet\\wallet-dimensions.webp'
        } 
    }
        
    const params = useParams();
    const product = params.product;
    const [currentImg, setCurrentImg] = useState(productImages[`${product}`].img1);

    const changeMainImg = (e)=>{
        setCurrentImg(e.target.src);
    }

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
        cartCtx.addItem(item);
    }

    let ImgComponent;
       ImgComponent = <div className={classes.prodImages}>
           <div className={classes.otherImg}>
            <img src={productImages[`${product}`].img1} onClick={changeMainImg} type='image/webp'/>
            <img src={productImages[`${product}`].img2} onClick={changeMainImg} type='image/webp'/>
            <img src={productImages[`${product}`].img3} onClick={changeMainImg} type='image/webp'/>
            <img src={productImages[`${product}`].img4} onClick={changeMainImg} type='image/webp'/>
            </div>
            <div className={classes.prodDetails}>
            <div className={classes.mainImg}>
            <img src={currentImg} type='image/webp'/>
            </div>
            <div>
            <span>${item.price}</span>
            <Button onClick = {addToCartHandler} className={classes.cart_action}>ADD TO CART</Button>
            {isProductAdded && <Message>
               Product : <b>{item.title}</b> added to the cart </Message> }
            </div>
            </div>  
       </div>
    return(<div className={classes.main}>
        {ImgComponent}
        <ProductReviews/>
        </div>)
};
export default ProductDetails;