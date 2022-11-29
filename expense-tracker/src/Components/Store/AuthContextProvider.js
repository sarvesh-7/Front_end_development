import AuthContext from './AuthContext';
import React,{useState,useEffect} from 'react';

const AuthContextProvider = (props)=>{

    //state to check user authentication
    const[isLoggedin,setIsLoggedIn] = useState();

    const token = localStorage.getItem('expense_token');

    //check if user has loggedin or not i.e to make login persistant after refresh
    useEffect(()=>{
        if(token){
            setIsLoggedIn(true);
        }
    },[token]);

    //update user token
    const updateToken = (token)=>{

        //update token in local storage and update state
        localStorage.setItem('expense_token', token);
        setIsLoggedIn(true);
    }
    const authCtx = {
        token:token,
        isLoggedin : isLoggedin,
        updateToken:updateToken
    };

    return(
        <AuthContext.Provider value={authCtx}>
            {props.children}
        </AuthContext.Provider>
    )
};
export default AuthContextProvider;