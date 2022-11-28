import './App.css';
import AuthForm from './Components/Auth/AuthForm';
import {Route,Routes} from 'react-router-dom';
import Welcome from './Pages/Welcome';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<AuthForm/>}/>
        <Route path='/welcome' element={<Welcome/>}/>
      </Routes>
    </div>
  );
}

export default App;
