import './App.css';
import NavBar from './Components/Layout/NavigationBar';
import AuthForm from './Components/Auth/AuthForm';
import {Routes,Route,Navigate} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import Welcome from './Pages/Welcome';
import {useEffect} from 'react';
import {authActions} from './Store/Auth';

function App() {

  const dispatch = useDispatch();

  //make login state persistant
  useEffect(()=>{

    const token = localStorage.getItem('TOKEN');
    const email = localStorage.getItem('EMAIL');

    if(token && email)
      dispatch(authActions.updateAuthInfo({token,email}));

  },[dispatch]);

  const token = useSelector(state=>state.auth.token);

  return (
     <Routes>
     {
       !token &&
       <> 
       <Route path="*" element = {<Navigate to='/' replace={true}/>}/>
       <Route path='/' element={<><NavBar/><AuthForm/></>}/>
       </>
     }
     {
       token && 
       <>
       <Route path='/' element = {<Navigate to='/Welcome' replace={true}/>}/>
       <Route path="/welcome" element={<Welcome/>}/>
       </>
     }
     </Routes>
  );
}

export default App;
