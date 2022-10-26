import React, { useState, useEffect, useReducer, useContext } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../store/auth-context';
import Input from '../UI/Input/Input';

//reducer function which will return a new state for email and its validity
const emailReducer = (state, action) =>{
  if(action.type === 'USER_INPUT'){
    return{value : action.val, isValid : action.val.includes('@')};
  }
  if(action.type === 'INPUT_BLUR'){
    return{value : state.value, isValid : state.value.includes('@')};
  }
  return{value : '', isValid : false};
}

//reducer function which will return a new state for password and its validity
const passwordReducer = (state, action) =>{
  if(action.type === 'USER_INPUT'){
    return{value : action.val, isValid : action.val.trim().length > 6};
  }
  if(action.type === 'INPUT_BLUR'){
    return{value : state.value, isValid : state.value.trim().length > 6};
  }
  return{value : '', isValid : false};
}

//reducer function which will return a new state for college and its validity
const collegeReducer = (state, action) =>{
  if(action.type === 'USER_INPUT'){
    return{value : action.val, isValid : action.val.trim().length > 0};
  }
  if(action.type === 'INPUT_BLUR'){
    return{value : state.value, isValid : state.value.trim().length > 0};
  }
  return{value : '', isValid : false};
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  // const [enteredCollege, setEnteredCollege] = useState('');
  // const [collegeIsValid, setCollegeIsValid] = useState();

  //manage entered email state and its validity state together using useReducer()

  const[emailState, emailDispatcher] = useReducer(emailReducer, {value : '', isValid : true});

  //manage entered password state and its validity state together using useReducer()

  const[passwordState, passwordDispatcher] = useReducer(passwordReducer, {value : '', isValid : true});

   //manage entered college state and its validity state together using useReducer()

   const[collegeState, collegeDispatcher] = useReducer(collegeReducer, {value : '', isValid : true})

   const ctx = useContext(AuthContext);
  

  // useEffect(()=>{
  //   const timer = setTimeout(()=>{
  //     console.log('useEffect running');
  //     setFormIsValid( enteredEmail.includes('@') && enteredPassword.trim().length > 6
  //   && enteredCollege.trim().length > 0);
  //   },500);

  //   return (()=>{
  //     clearTimeout(timer);
  //     console.log('cleanup activity');
  //   })
    
  // }, [enteredEmail, enteredPassword,enteredCollege]);

  const emailChangeHandler = (event) => {
    //call dispatch email method to update state to the entered email
    emailDispatcher({type : 'USER_INPUT', val : event.target.value});

    setFormIsValid( event.target.value.includes('@') && passwordState.value.trim().length > 6
    && collegeState.value.trim().length > 0);
  };

  const collegeChangeHandler = (event) => {
    // setEnteredCollege(event.target.value);
    //call dispatch college method to update state to the entered college
    collegeDispatcher({type : 'USER_INPUT', val : event.target.value});

    setFormIsValid( emailState.value.includes('@') && passwordState.value.trim().length > 6
    && event.target.value.trim().length > 0);
  }

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    passwordDispatcher({type : 'USER_INPUT', val : event.target.value});
    setFormIsValid( emailState.value.includes('@') && event.target.value.trim().length > 6
    && collegeState.value.trim().length > 0);
  
  };

  const validateEmailHandler = () => {
    emailDispatcher({type : 'INPUT_BLUR'});
    // setEmailIsValid(emailState.isValid);
  };

  const validateCollegeHandler = () =>{
    // setCollegeIsValid(enteredCollege.trim().length > 0);
    collegeDispatcher({type : 'INPUT_BLUR'});
  }

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    passwordDispatcher({type : 'INPUT_BLUR'});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    ctx.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <Input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        {/* Add extra field for college along with required validations */}
        <div
          className={`${classes.control} ${
            collegeState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="college">College</label>
          <Input
            type="text"
            id="college"
            value={collegeState.value}
            onChange={collegeChangeHandler}
            onBlur={validateCollegeHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <Input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
