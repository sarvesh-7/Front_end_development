import React,{useRef,useContext} from 'react';
import Form from '../../Components/UI/Form';
import Button from '../../Components/UI/Button';
import {useHistory} from 'react-router-dom';
import classes from './Login.module.css';
import CartContext from '../../Components/store/CartContext';
const Login = (props)=>{

    const cartCtx = useContext(CartContext);
    const emailRef = useRef();
    const passwordRef = useRef();
    const history = useHistory();

    const onLoginHnalder=async(e)=>{
        e.preventDefault();
        try{
            const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC7lmr4RcmF7Vj9__TB7b_Gr0VUHH5SoYI',
            {
                method:'POST',
                body:JSON.stringify({
                    email : emailRef.current.value,
                    password : passwordRef.current.value,
                    returnSecureToken : true
                }),
                header:{
                    'Content-Type'  : 'application/json'
                }   
            });
            if(res.ok){
                const data = await res.json();
                alert('User authenticated successfully');
                cartCtx.updateToken(data.idToken);
                cartCtx.updateEmail(emailRef.current.value);
                console.log('email', emailRef.current.value);
                history.replace('/');
            }
            else{
                const data = await res.json();
                alert(data.error.message);
            }
        }
        catch(error){
            console.log(error);
        }

    }
   return (
    <Form>
        <label htmlFor='email'>Email</label>
        <input type='email' id='email' ref={emailRef}/>
        <label htmlFor='password'>Password</label>
        <input type='password' id='password' ref={passwordRef}/>
        <Button className={classes.submit} onClick={onLoginHnalder}>Login</Button>
    </Form>);
};
export default Login;
