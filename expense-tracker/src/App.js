import './App.css';
import AuthForm from './Components/Auth/AuthForm';
import {Route,Routes,Navigate} from 'react-router-dom';
import Welcome from './Pages/Welcome';
import Profile from './Pages/Profile';
import AuthContext from './Components/Store/AuthContext';
import {useContext,Fragment} from 'react';

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <div className="App">
      <Routes>
      {
        authCtx.isLoggedin &&
        <Fragment> 
        <Route path='/' element={<Navigate to = '/welcome' replace={true}/>}/>
        <Route path='/welcome' element={<Welcome/>}/>
        <Route path='/profile' element={<Profile/>}/>
        </Fragment>
      }
      {
        !authCtx.isLoggedin && <Route path = '/' element={<AuthForm/>}/>
      }
      {
        !authCtx.isLoggedin && <Route path='*' element={<Navigate to = '/' replace={true}/>}/>
      }
      {
        authCtx.isLoggedin && <Route path='*' element={<p>404 not found</p>}/>
      } 
      </Routes>
    </div>
  );
}

export default App;
