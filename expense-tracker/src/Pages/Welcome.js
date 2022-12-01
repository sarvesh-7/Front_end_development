import classes from './Welcome.module.css';
import {Link} from 'react-router-dom';
import React,{Fragment,useContext} from 'react';
import AuthContext from '../Components/Store/AuthContext';
import Button from '../Components/UI/Button';
import Logout from './Logout';
import ExpenseForm from '../Components/Expenses/ExpenseForm';
import axios from 'axios';

const Welcome = (props) => {
    const authCtx = useContext(AuthContext);

    const verifyEmailUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAzi_a8TFUiRe70M2TSFzybhf5lVXqu7Wc';

    //verify user's email address
    const verifyEmailHandler=async(e)=>{
        try
        {
            const res = await axios.post(verifyEmailUrl, 
                {
                    requestType : 'VERIFY_EMAIL',
                    idToken : authCtx.token
                });
                if(res.status===200){
                    alert('Email verified successfully');
                    console.log(res);
                }
                else{
                    alert('Email verification failed');
                    console.log(res);
                }  
        }
        catch(error){
            console.log(error);
        }
      
    }

    return (
        <Fragment>
        <div className={`${classes.welcome} font-italic`}>
        <p>Welcome to Expense Tracker!!!</p>
        <Button onClick={verifyEmailHandler} className={classes.verify}>Verify Email</Button>
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
        <Logout/>
        </div>
        <hr/>
        <ExpenseForm/>
        </Fragment>
    )
}
export default Welcome;
