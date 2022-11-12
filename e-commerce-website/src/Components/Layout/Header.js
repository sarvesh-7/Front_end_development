import React from 'react';
import classes from './Header.module.css';
import {NavLink} from 'react-router-dom';

const Header = props=>{
return(<div className={classes.header}>
    <span className={classes.title}>The Generics</span>
    {props.urlPath==='/Store' &&
    <div>
        <button className={classes.action}>Get our Latest Album</button><br/>
        <NavLink to='/' className="fa fa-play-circle-o"></NavLink>
    </div>
    }
</div>);
}
export default Header;