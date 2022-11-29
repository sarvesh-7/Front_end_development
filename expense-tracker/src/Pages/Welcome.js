import classes from './Welcome.module.css';
import {Link} from 'react-router-dom';
import React,{Fragment} from 'react';
const Welcome = (props) => {
    return (
        <Fragment>
        <div className={`${classes.welcome} font-italic`}>
        <p>Welcome to Expense Tracker!!!</p>
        <p className={classes.profile}>Your profile is incomplete.
        <Link to='/profile'>Complete now</Link> 
        </p>
        </div>
        <hr/>
        </Fragment>


    )
}
export default Welcome;
