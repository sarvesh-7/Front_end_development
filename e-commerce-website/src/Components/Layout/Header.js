import React from 'react';
import classes from './Header.module.css';
const Header = props=>{
return(<div className={classes.header}>
    <span className={classes.title}>The Generics</span>
</div>);
}
export default Header;