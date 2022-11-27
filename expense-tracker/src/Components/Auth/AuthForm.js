import React,{useState,useRef,useContext} from 'react';
import Button from '../UI/Button';
// import UserContext from '../Store/UserContext';
// import {useHistory} from 'react-router-dom';
import classes from './AuthForm.module.css';
const AuthForm = (props) => {

    //state to toggle between login/signup function
    const [isLogin,setIsLogin] = useState(false);

     //state to show sending request loader
    const[isSendingReq, setIsSendingReq] = useState(false);

    //get entered email and password
    const emailRef = useRef();
    const passwordRef = useRef();
    const confPasswordRef = useRef();

    //check password validity
    // const checkPasswordFormat = (password)=>{

    //     //password must be 7-14 char long and must have only numbers, letters and underscore
    //     let format =  /^[A-Za-z]\w{7,14}$/;

    //     //check if password matches above format
    //     if(password.value.match(format)) 
    //     { 
    //         return true;
    //     }
    //     else
    //     { 
    //         if(password[0]==='_' || !isNaN(password[0]))
    //         alert('first character must be a letter');
    //         else
    //         alert('Passowrd must only contain alphanumeric characters and should be 7-14 characters long');
    //         return false;
    //     }
    // }

    //check email validity
    // const checkEmailFormat = (email)=>{
    //     const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    //     if (mail.match(emailFormat)) 
    //     {
    //         return true;
    //     } 
    //     else 
    //     {
    //         alert('please enter valid email address');
    //         return false;
    //     }
    // }

    //toggle between signup/login functionality
    //switch between login/signeup
        const switchAuthModeHandler = () => {
            setIsLogin((prevState) => !prevState);
            emailRef.current.value = '';
            passwordRef.current.value = '';
            confPasswordRef.current.value = '';
        };


    //submit user details to create account/login
    const onSubmitHandler=async(e)=>{
        e.preventDefault();

        //if user is trying to signup
        if(!isLogin){

            //get email and password entered on screen
            const email = emailRef.current.value;
            const password = passwordRef.current.value;
            const confPasword = confPasswordRef.current.value;

            //check if all fields are not empty
            if(email===''||password===''||confPasword==='')
            {
                alert('All fields are mandatory');
            }

            else if(password!==confPasword)
            {
                alert('Please enter same confirmation password');
            }

            //check if password and email has valid format and then create new user in firebase
            else
            {
                try{
                    const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAzi_a8TFUiRe70M2TSFzybhf5lVXqu7Wc',
                  {
                    method:'POST',
                    body: JSON.stringify({
                      email:email,
                      password:password,
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
                    alert(data.error.message);
                    setIsSendingReq(false);
                  }
                  }
                  catch(error){
                    console.log(error);
                    setIsSendingReq(false);
                  }
            }
        }
        //if user is trying to login
        else
        {
            try{
                const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAzi_a8TFUiRe70M2TSFzybhf5lVXqu7Wc',
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
                // const data = await res.json();
                // console.log('auth token: ',data.idToken);
                // userCtx.updateToken(data.idToken);
                // history.replace('/');
              }
              else{
                //if credentials are wrong
                const data = await res.json();
                // console.log(data.error.message);
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
    }
    return (
        <div className={classes.authForm}>
        <h1>{isLogin ? 'Login' : 'SignUp' }</h1>
        <form onSubmit={onSubmitHandler}>
            <label forhtml='email'>Email</label>
            <input type='email' id='email' ref={emailRef}/>
            <label forhtml='password'>Password</label>
            <input type='password' id='password' ref={passwordRef}/>
            {
              !isLogin && 
              <React.Fragment> 
              <label forhtml='conf_password'>Confirm Password</label>
              <input type='password' id='conf_password' ref={confPasswordRef}/>
              </React.Fragment>
            }
            {
                !isSendingReq && <Button type='submit' className={classes.authButton}>{isLogin ? 'Login' : 'Sign Up' }</Button>
            }
            {
                isSendingReq && <p>Sending Request</p>
            }
            
        </form>
        <Button onClick={switchAuthModeHandler} className={classes.switchAuth}>{isLogin ? 'Create new account' : 'Have an account?Login' }</Button>
        </div>
    )
}
export default AuthForm;
