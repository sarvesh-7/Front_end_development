import classes from './CartButton.module.css';
const CartButton = ()=>{
    return(
        <button className={classes.cart}>
            <i className="material-icons">shopping_cart</i>
            Your Cart
            <div className={classes['cart-value']}>0</div>
        </button>

    )
};
export default CartButton;