import React from 'react';
import classes from './NavBar.module.css';
const NavBar = props=>{
return(
    <div className={classes.empty_div}>
    <div className={classes.NavBar}>
        <div className={classes.menus}>
            <div>
            <span className={classes.menu_action}>HOME</span>
            <span className={classes.menu_action}>STORE</span>
            <span className={classes.menu_action}>ABOUT</span>
            </div>
            <button className={classes.button}>Cart</button>
        </div>        
    </div>
    </div>
)
}
export default NavBar;