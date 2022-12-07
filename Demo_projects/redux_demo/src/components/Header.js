import classes from './Header.module.css';
import {useDispatch,useSelector} from 'react-redux';
import {authActions } from '../store/auth';

const Header = () => {
  const dispatch = useDispatch();
  //get isAuthenticated state from auth slice from redux store
  const isAuthenticated = useSelector(state=>state.auth.isAuthenticated);

  //change isAuthenticated state to false from redux auth state slice
  const logoutHandler = (e)=>{
    e.preventDefault();
    dispatch(authActions.logout());
  }

  return (
    <header className={classes.header}>
      <h1>Redux Auth</h1>
      {isAuthenticated && <nav>
        <ul>
          <li>
            <a href='/'>My Products</a>
          </li>
          <li>
            <a href='/'>My Sales</a>
          </li>
          <li>
            <button onClick={logoutHandler}>Logout</button>
          </li>
        </ul>
      </nav>}
      
    </header>
  );
};

export default Header;
