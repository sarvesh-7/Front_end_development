import './App.css';
import NavBar from './Components/Layout/NavigationBar';
import AuthForm from './Components/Auth/AuthForm';
import {Routes,Route,Navigate} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import Welcome from './Pages/Welcome';
import Inbox from './Components/EmailActions/Inbox';
import Sentbox from './Components/EmailActions/Sentbox';
import Compose from './Components/EmailActions/Compose';
import EmailMessage from './Components/EmailActions/EmailMessage';
import SentEmailMessage from './Components/EmailActions/SentEmailMessage';
import {useEffect} from 'react';
import {authActions} from './Store/Auth';

function App() {

  const getURL = 'https://mail-box-client-fcae9-default-rtdb.firebaseio.com';
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
       
       <Route path="/Welcome" element={<Welcome/>}>
         <Route path="/Welcome/Compose" element={<Compose/>} />
         <Route path='/Welcome/Inbox/:msgId' element={<EmailMessage/>}/>
         <Route path='/Welcome/Inbox' element={<Inbox/>}/>
         <Route path='/Welcome/Sentbox' element={<Sentbox/>}/>
         <Route path='/Welcome/Sentbox/:msgId' element={<SentEmailMessage/>}/>
       </Route> 
       </>
     }
     </Routes>
  );
}

export default App;
