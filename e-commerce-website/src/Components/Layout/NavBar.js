import React,{useState,useContext} from 'react';
import classes from './NavBar.module.css';
import Cart from '../Cart/Cart';
import {NavLink} from 'react-router-dom';
import CartContext from '../store/CartContext';
const NavBar = props=>{
const [isCartOpen,setIsCartOpen] = useState(false);

let cartItemsCount = 0;

//update total cart elements count
const cartCtx = useContext(CartContext);

cartCtx.cartItems.forEach(item => {
    cartItemsCount += item.quantity;
})

const showCartHandler = (e) =>{
    setIsCartOpen(true);
}

const hideCartHandler = (e) =>{
    setIsCartOpen(false);
}

return(
    <div className={classes.empty_div}>
    <div className={classes.NavBar}>
        <div className={classes.menus}>
            <div>
            <NavLink activeClassName = {classes.active} to='/Home'>
            <span className={classes.menu_action}>HOME</span>
            </NavLink>
            <NavLink activeClassName = {classes.active} to='/Store'>
            <span className={classes.menu_action}>STORE</span>
            </NavLink>
            <span className={classes.menu_action}>
                <NavLink activeClassName = {classes.active} to='/About'>ABOUT</NavLink>
            </span>
            </div>
            <div>
            <button onClick = {showCartHandler} className={classes.button}>Cart</button>
            <span>{cartItemsCount}</span>
            </div>
            {isCartOpen && <Cart onHideCart = {hideCartHandler} />}
        </div>        
    </div>
    </div>
)
}
export default NavBar;