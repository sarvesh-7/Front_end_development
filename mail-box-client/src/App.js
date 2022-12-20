import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/Button';
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
    console.log(token,email);

    if(token && email)
      dispatch(authActions.updateAuthInfo(token,email));

  },[dispatch]);

  const token = useSelector(state=>state.auth.token);
  console.log(token);

  return (
    <>  
     {
       !token && 
       <>
       <NavBar/>
       <AuthForm/>
       </>
     }
     <Routes>
     {
       token && 
       <>
       <Route path='/' element = {<Navigate to='/Welcome' replace={true}/>}/>
       <Route path="/welcome" element={<Welcome/>}/>
       </>
     }
     </Routes>
     
    </>
  );
}

export default App;
