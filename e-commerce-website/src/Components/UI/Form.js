import React from 'react';
import classes from './Form.module.css';
const Form = (props)=>{
    const formClasses = props.className; 
    return <form className={formClasses}>{props.children}</form>;
};
export default Form;