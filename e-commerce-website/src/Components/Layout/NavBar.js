import React,{useState} from 'react';
import classes from './NavBar.module.css';
import Cart from '../Cart/Cart';
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
            <span className={classes.menu_action}>HOME</span>
            <span className={classes.menu_action}>STORE</span>
            <span className={classes.menu_action}>ABOUT</span>
            </div>
            <button onClick = {showCartHandler} className={classes.button}>Cart</button>
            {isCartOpen && <Cart onHideCart = {hideCartHandler} />}
        </div>        
    </div>
    </div>
)
}
export default NavBar;