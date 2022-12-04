import Counter from './components/Counter';
import Header from '../src/components/Header';
import UserProfile from '../src/components/UserProfile';
import Auth from '../src/components/Auth';
import {Fragment, useReducer} from 'react';
import {useSelector} from 'react-redux';


function App() {
  const isAuth = useSelector(state=>state.auth.isAuthenticated);

  return (
    <Fragment>
    <Header/>
    {!isAuth && <Auth/> }
    {isAuth && <UserProfile/>}
    <Counter />
    </Fragment>
  );
}

export default App;
