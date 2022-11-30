import classes from './Welcome.module.css';
import {Link} from 'react-router-dom';
import React,{Fragment,useContext} from 'react';
import AuthContext from '../Components/Store/AuthContext';

const Welcome = (props) => {
    const authCtx = useContext(AuthContext);

    return (
        <Fragment>
        <div className={`${classes.welcome} font-italic`}>
        <p>Welcome to Expense Tracker!!!</p>
        {
            !authCtx.fullName && !authCtx.profilePhoto &&
            <p className={classes.profile}>
            Your profile is incomplete  
            <Link to={`/profile`}>Complete now</Link> 
            </p>
        }
        {
            authCtx.fullName && authCtx.profilePhoto &&
            <p className={classes.profile}>
                Your profile is completed &nbsp;
                <Link to={`/profile`}>Edit profile</Link> 
            </p>
        }
        </div>
        <hr/>
        </Fragment>


    )
}
export default Welcome;
