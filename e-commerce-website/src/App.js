import logo from './logo.svg';
import './App.css';
import NavBar from './Components/Layout/NavBar';
import Header from './Components/Layout/Header';
import Products from './Components/Products/Products';
import ContextProvider from './Components/store/ContextProvider';
import {Route,Redirect} from 'react-router-dom';
import About from './Pages/About';
import Footer from './Components/Layout/Footer';
import Home from './Pages/Home';

let home = '/Home';
let store = '/Store';
let about = '/about';

function App() {
  return (
    <ContextProvider>
    <div className="App">
      <NavBar/>
      <Route path={about}><About/></Route>
      <Route exact path='/'>
        <Redirect to={home}/>
        </Route>
      <Route path={home}>
      <Header urlPath={store}/>
      <Home/>
      </Route>
      <Route path={store}>
      <Header/>
      <Products/>
      </Route>
      <Footer/>
    </div>
    </ContextProvider>
  );
}

export default App;
