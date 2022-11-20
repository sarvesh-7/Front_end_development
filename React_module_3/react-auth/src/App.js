import { Switch, Route, Redirect } from 'react-router-dom';
import {useContext,useEffect} from 'react';
import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import UserContext from './components/Store/UserContext';

function App() {

  const userCtx = useContext(UserContext);
  console.log('re-rendering');
  return (
    <Layout>
      <Switch>
        <Route path='/' exact>  
        {userCtx.token && <HomePage />}
        {!userCtx.token && <Redirect to ='/auth'/>}
        </Route>
        <Route path='/auth' exact>
          <AuthPage />
        </Route>
        {/* {
          userCtx.token &&
          <Route exact path='/auth'>
          <Redirect to='/profile'/>
          </Route>
        } */}
        <Route path='/profile'>
          {userCtx.token && <UserProfile />}
          {!userCtx.token && <Redirect to ='/auth'/>}
        </Route>
        <Route path='*'>
          <Redirect to ='auth'/>
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
