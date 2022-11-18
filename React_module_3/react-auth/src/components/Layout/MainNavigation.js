import { Link } from 'react-router-dom';
import UserContext from '../Store/UserContext';
import {useContext} from 'react';
import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  const userCtx = useContext(UserContext);
  const onLogoutHandler = ()=>{
    userCtx.updateToken('');
  }
  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {
            !userCtx.token && 
            <li>
            <Link to='/auth'>Login</Link>
          </li>
          }
          {
            userCtx.token && 
            <li>
            <Link to='/profile'>Profile</Link>
            </li>
          }
          {
            userCtx.token && 
            <li>
            <button onClick={onLogoutHandler}>Logout</button>
            </li>
          }
          
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
