import React, { useState, useEffect } from 'react';

const AuthContext = React.createContext({
    isLoggedIn : false,
    onLogout : ()=>{},
    onLogin : ()=>{}
});

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const userLoggedInInfo = localStorage.getItem('isLoggedIn');
  
    useEffect(()=>{
      if(userLoggedInInfo === '1'){
        setIsLoggedIn(true);
      }
    }, []) //call useEffect only once when page refreshes to check if user has logged in already
  
  
    const loginHandler = (email, password) => {
      localStorage.setItem('isLoggedIn', '1'); //store user logged in info on localstorage
      setIsLoggedIn(true);
    };
  
    const logoutHandler = () => {
      setIsLoggedIn(false);
      localStorage.setItem('isLoggedIn', '0');
    };

return (<AuthContext.Provider
            value = {{isLoggedIn : isLoggedIn,
            onLogout : logoutHandler, 
            onLogin : loginHandler}} >{props.children}</AuthContext.Provider>);
   
}

export default AuthContext;