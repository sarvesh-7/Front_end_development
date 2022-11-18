import { Switch, Route } from 'react-router-dom';
// import {useContext} from 'react';
import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import UserContext from './components/Store/UserContext';

function App() {
  // const userCtx = useContext(UserContext);
  console.log('re-rendering');
  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <HomePage />
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
          <UserProfile />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
