import React,{useState} from 'react';
import classes from './NavBar.module.css';
import Cart from '../Cart/Cart';
import {NavLink} from 'react-router-dom';
const NavBar = props=>{
const [isCartOpen,setIsCartOpen] = useState(false);

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
            <span className={classes.menu_action}>STORE</span>
            <span className={classes.menu_action}>
                <NavLink activeClassName = {classes.active} to='/About'>ABOUT</NavLink>
            </span>
            </div>
            <button onClick = {showCartHandler} className={classes.button}>Cart</button>
            {isCartOpen && <Cart onHideCart = {hideCartHandler} />}
        </div>        
    </div>
    </div>
)
}
export default NavBar;