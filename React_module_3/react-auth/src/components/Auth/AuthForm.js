import { useState,useRef } from 'react';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const[isSendingReq, setIsSendingReq] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const onSubmitHandler = async(event)=>{
    event.preventDefault();
    setIsSendingReq(true);
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
          //do something
          setIsSendingReq(false);
          alert('User authenticated successfully');
          const data = await res.json();
          console.log('auth token: ',data.idToken);
        }
        else{
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
        //do something
        setIsSendingReq(false);
        alert('User created successfully');
      }
      else{
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
