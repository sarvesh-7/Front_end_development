import classes from './Footer.module.css';
import React from 'react';
const Footer = ()=>{
    return(
        <div className={classes.footer}>
            <span style={{color:'black'}}>Created by Sarvesh</span>
        </div>
    );
}
export default React.memo(Footer);