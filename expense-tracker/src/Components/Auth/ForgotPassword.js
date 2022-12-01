import classes from './ForgotPassword.module.css';
import Button from '../UI/Button';
import axios from 'axios';
import LoadingSpinner from '../UI/LoadingSpinner';
import { useRef,useState } from 'react';

const ForgotPassword = ()=>{

    //get user email id to send password reset link
    const emailRef = useRef();

    //check if request is pending or completed
    const[status,setStatus] = useState('');
    

    //reset password URL
    const resetPasswordUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAzi_a8TFUiRe70M2TSFzybhf5lVXqu7Wc';

    //reset password using link sent on email ID
    const resetPasswordHandler = async(e)=>{

        e.preventDefault();
        setStatus('pending');
        try{
            const res = await axios.post(resetPasswordUrl,
                {
                    requestType:'PASSWORD_RESET',
                    email: emailRef.current.value
                });
                
                if(res.status===200){
                    alert('Password reset link has been sent on the entered email');
                    setStatus('completed');
                }
                else{
                    alert('Error while processing request');
                }
        }
        catch(error){
            alert(error.message);
        }    
    }

    return(
    <div className={classes.resetPswdForm}>
    {
        status!=='pending' &&
        <form className={classes.form}>
        <label forhtml='email'>Enter the email with which you have registered</label>
        <input type='email' id='email' placeholder='email' ref={emailRef}/>
        <Button onClick={resetPasswordHandler} className={classes.resetButton}>Send Link</Button>
       </form>
    }
    {
        status==='pending' && <LoadingSpinner/>
    } 
    </div>
    )
};
export default ForgotPassword;