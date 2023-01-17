import NavBar from './Components/Layout/NavigationBar';
import AuthForm from './Components/Auth/AuthForm';
import {Routes,Route,Navigate} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import {useEffect,Suspense,lazy} from 'react';
import {authActions} from './Store/Auth';
import Footer from './Components/Layout/Footer';
import './App.css';

function App() {

  const dispatch = useDispatch();

  //lazy load below react components except auth form , navbar and footer
  const Welcome = lazy(()=>import('./Pages/Welcome'));
  const Sentbox = lazy(()=>import('./Components/EmailActions/Sentbox'));
  const Compose = lazy(()=>import('./Components/EmailActions/Compose'));
  const Inbox = lazy(()=>import('./Components/EmailActions/Inbox'));
  const EmailMessage = lazy(()=>import('./Components/EmailActions/EmailMessage'));
  const SentEmailMessage = lazy(()=>import('./Components/EmailActions/SentEmailMessage'));
  const ForgotPassword = lazy(()=>import('./Components/Auth/ForgotPassword'));

  //make login state persistant
  useEffect(()=>{

    const token = localStorage.getItem('TOKEN');
    const email = localStorage.getItem('EMAIL');

    if(token && email)
      dispatch(authActions.updateAuthInfo({token,email}));

  },[dispatch]);

  const token = useSelector(state=>state.auth.token);

  return (
    <div className='flex-div'>
      <div>
        <Suspense fallback={<p>Loading..</p>}>
     <Routes>
     {
       !token &&
       <> 
       <Route path="*" element = {<Navigate to='/' replace={true}/>}/>
       <Route path='/' element={<><NavBar/><AuthForm/></>}/>
       <Route path='/ForgotPassword' element={<><NavBar/><ForgotPassword/></>}/>
       </>
     }
     {
       token && 
       <>
       <Route path='/' element = {<Navigate to='/Welcome/Inbox' replace={true}/>}/>
       
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
     </Suspense>
     </div>
     <div>
     <Footer/>
     </div>
     </div>
  );
}

export default App;
