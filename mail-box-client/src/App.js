import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/Button';
import NavBar from './Components/Layout/NavigationBar';
import Signup from './Components/Auth/Signup';

function App() {
  return (
    <>
     <NavBar/>
     <Signup/>
    </>
  );
}

export default App;
