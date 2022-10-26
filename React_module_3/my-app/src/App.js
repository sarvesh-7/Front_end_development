import React, { useState, useEffect } from 'react';

import Login from './Components/Login/Login';
import Home from './Components/Home/Home';
import MainHeader from './Components/MainHeader/MainHeader';
import AuthContext from './Components/store/auth-context';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const userLoggedInInfo = localStorage.getItem('isLoggedIn');

  useEffect(()=>{
    if(userLoggedInInfo === '1'){
      setIsLoggedIn(true);
    }
  }, []) //call useEffect only once when page refreshes to check if user has logged in already


  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem('isLoggedIn', '1'); //store user logged in info on localstorage
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
    localStorage.setItem('isLoggedIn', '0');
  };

  return (
      <AuthContext.Provider value = {{
        isLoggedIn : isLoggedIn,
        onLogout : logoutHandler
    }}>
      <MainHeader />
      <main>
        {!isLoggedIn && <Login/>}
        {isLoggedIn && <Home />}
      </main>
      </AuthContext.Provider>
  );
}

export default App;