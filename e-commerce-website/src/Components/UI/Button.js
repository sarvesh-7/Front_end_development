import React from 'react';
import classes from './Button.module.css';
const Button = (props)=>{
    const classesList = `${classes.action} ${props.className}`;
    return <button type = {props.type} className={classesList}
    onClick={props.onClick}>{props.children}</button>
}

export default Button;