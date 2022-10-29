import classes from './CartButton.module.css';
const CartButton = ()=>{
    return(
        <button className={classes.cart}>
            <i className="material-icons">shopping_cart</i>
            <span>Your Cart</span>
            <span className={classes['cart-value']}>0</span>
        </button>

    )
};
export default CartButton;