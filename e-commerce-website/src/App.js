import logo from './logo.svg';
import './App.css';
import NavBar from './Components/Layout/NavBar';
import Header from './Components/Layout/Header';
import Products from './Components/Products/Products';
import ContextProvider from './Components/store/ContextProvider';
import {Route,Redirect} from 'react-router-dom';
import About from './Pages/About';
import Footer from './Components/Layout/Footer';

function App() {
  return (
    <ContextProvider>
    <div className="App">
      <NavBar/>
      <Route path='/About'><About/></Route>
      <Route exact path='/'>
        <Redirect to='/Home'/>
        </Route>
      <Route path='/Home'>
      <Header/>
      <Products/>
      </Route>
      <Footer/>
    </div>
    </ContextProvider>
  );
}

export default App;
