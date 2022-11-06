import classes from './CartButton.module.css';
import {useContext} from 'react';
import CartContext from '../../Store/CartContext';

const CartButton = (props)=>{

    //calculate total cart items using context items array
    const CartCtx = useContext(CartContext);
    let totalMeals = 0;

    CartCtx.cartItems.forEach(item => {
        totalMeals += item.quantity;
    })

    return(
        <button onClick = {props.onClick} className={classes.button}>
            <i className={`${'material-icons ' + classes.icon }`}>shopping_cart</i>
            <span>Your Cart</span>
        <span className={classes.badge}>
            {totalMeals}
        </span>
        </button>
    )
};
export default CartButton;