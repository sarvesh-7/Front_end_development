import React,{useContext} from 'react';
import AuthContext from './Components/store/auth-context';

import Login from './Components/Login/Login';
import Home from './Components/Home/Home';
import MainHeader from './Components/MainHeader/MainHeader';

function App() {
  //get access to auth context object
  const authCtx = useContext(AuthContext);

  return (
     <React.Fragment>
      <MainHeader />
      <main>
        {!authCtx.isLoggedIn && <Login onLogin={authCtx.onLogin} />}
        {authCtx.isLoggedIn && <Home onLogout={authCtx.onLogout} />}
      </main>
      </React.Fragment>
      
  );
}

export default App;