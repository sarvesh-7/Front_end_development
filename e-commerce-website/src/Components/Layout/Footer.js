import React from 'react';
import classes from './Footer.module.css';
import {NavLink} from 'react-router-dom';
const Footer = props=>{
    return ( 
    <footer>
        <div className={classes.footer}>
        <h1>The Generics</h1>
        <div className={classes.link}>
        <NavLink to = '/' class="fa fa-linkedin"></NavLink>
        <NavLink to = '/' class="fa fa-twitter"></NavLink>
        <NavLink to = '/' class="fa fa-youtube"></NavLink>
        </div>
        </div>
    </footer> );
}
export default Footer;