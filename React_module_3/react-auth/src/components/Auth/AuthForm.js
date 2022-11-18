import { useState,useRef,useContext } from 'react';
import UserContext from '../Store/UserContext';
import {useHistory} from 'react-router-dom';
import classes from './AuthForm.module.css';

const AuthForm = () => {
  const history = useHistory();
  //state to display login/sign up page
  const [isLogin, setIsLogin] = useState(true);
  //state to show sending request loader
  const[isSendingReq, setIsSendingReq] = useState(false);

  //refs to get email and password entered while login/signup
  const emailRef = useRef();
  const passwordRef = useRef();
  const userCtx = useContext(UserContext);

  //switch between login/signeup
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };


  const onSubmitHandler = async(event)=>{
    event.preventDefault();
    setIsSendingReq(true);
    //sending authentication request after login
    if(isLogin){
      try{
          const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC7lmr4RcmF7Vj9__TB7b_Gr0VUHH5SoYI',
        {
          method:'POST',
          body: JSON.stringify({
            email:emailRef.current.value,
            password:passwordRef.current.value,
            returnSecureToken:true
          }),
          header:{
            'Content-Type':'application/json'
          }
        });
        if(res.ok){
          //if credential matches
          setIsSendingReq(false);
          alert('User authenticated successfully');
          const data = await res.json();
          console.log('auth token: ',data.idToken);
          userCtx.updateToken(data.idToken);
          history.replace('/');
        }
        else{
          //if credentials are wrong
          const data = await res.json();
          console.log(data.error.message);
          // alert('Weak password : password should be at least 6 characters');
          alert(data.error.message);
          setIsSendingReq(false);
      }
    }
      catch(error){
        //do something
        console.log(error.message);
        setIsSendingReq(false);
      }
    }
    else{
      //send new user ac creation request to firebase
      try{
        const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC7lmr4RcmF7Vj9__TB7b_Gr0VUHH5SoYI',
      {
        method:'POST',
        body: JSON.stringify({
          email:emailRef.current.value,
          password:passwordRef.current.value,
          returnSecureToken:true
        }),
        header:{
          'Content-Type':'application/json'
        }
      });
      if(res.ok){
        //when succesfully created account
        setIsSendingReq(false);
        alert('User created successfully');
      }
      else{
        //when account creation failed due to same email or weak password etc
        const data = await res.json();
        console.log(data.error.message);
        // alert('Weak password : password should be at least 6 characters');
        alert(data.error.message);
        setIsSendingReq(false);
      }
      }
      catch(error){
        //do something
      }
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit = {onSubmitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' ref={emailRef} required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' ref={passwordRef} required />
        </div>
        
        <div className={classes.actions}>
        {
          isSendingReq && <span>Sending Request...</span>
        }
        {
          !isSendingReq && <button>{isLogin ? 'Login' : 'Create Account'}</button>
        } 
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
