import classes from './CartButton.module.css';

const CartButton = ()=>{
    return(
        <button className={classes.button}>
            <i className={`${'material-icons ' + classes.icon }`}>shopping_cart</i>
            <span>Your Cart</span>
            <span className={classes.badge}>0</span>
        </button>

    )
};
export default CartButton;