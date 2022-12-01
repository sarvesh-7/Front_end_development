import React,{useState,useRef,useContext} from 'react';
import Button from '../UI/Button';
import AuthContext from '../Store/AuthContext';
import {useNavigate} from 'react-router-dom';
import {Link} from 'react-router-dom';
import classes from './AuthForm.module.css';

const AuthForm = (props) => {

  const navigate = useNavigate();
    //state to toggle between login/signup function
    const [isLogin,setIsLogin] = useState(false);

     //state to show sending request loader
    const[isSendingReq, setIsSendingReq] = useState(false);

    //get entered email and password
    const emailRef = useRef();
    const passwordRef = useRef();
    const confPasswordRef = useRef();

    const authCtx = useContext(AuthContext);

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
                // navigate('/welcome',{replace:true});
            

                const data = await res.json();
                console.log('auth token: ',data.idToken);
                authCtx.updateAuthInfo(data.idToken,emailRef.current.value);
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
      <React.Fragment>
        <div className={classes.authForm}>
        <h1>{isLogin ? 'Login' : 'SignUp' }</h1>
        <form onSubmit={onSubmitHandler}>
            <input type='email' id='email' ref={emailRef} placeholder='Email'/>
            <input type='password' id='password' ref={passwordRef} placeholder='Password'/>
            {
              !isLogin && 
              <React.Fragment> 
              <input type='password' id='conf_password' ref={confPasswordRef} placeholder='Confirm Password'/>
              </React.Fragment>
            }
            {
                !isSendingReq && <Button type='submit' className={classes.authButton}>{isLogin ? 'Login' : 'Sign Up' }</Button>
            }
            {
                isSendingReq && <p>Sending Request</p>
            }
        </form>
        {
              isLogin &&
              <Link to='..'>Forgot password</Link>
        }
        </div>
        <div className={classes.switch}>
          <button onClick={switchAuthModeHandler} className={classes.switchAuth}>
          {isLogin ? "Don't have an account?Sign Up" : 'Have an account?Login' }</button>
        </div>
        </React.Fragment>
    )
}
export default AuthForm;
