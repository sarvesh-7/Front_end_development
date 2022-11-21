import logo from './logo.svg';
import './App.css';
import NavBar from './Components/Layout/NavBar';
import Header from './Components/Layout/Header';
import Products from './Components/Products/Products';
import ContextProvider from './Components/store/ContextProvider';
import {Route,Redirect,Switch} from 'react-router-dom';
import About from './Pages/About';
import Footer from './Components/Layout/Footer';
import Home from './Pages/Home';
import ContactPage from './Pages/ContactPage';
import ProductDetails from './Pages/ProductDetails';
import Login from './Pages/Auth/Login';

let home = '/Home';
let store = '/Store';
let about = '/about';
let contact = '/Contact';

function App() {
  return (
    <ContextProvider>
    <div className="App">
      <NavBar/>
      <div className='container'>
      <Route path={about}><About/></Route>
      <Route exact path='/'>
        <Redirect to={home}/>
        </Route>
      <Route path={home}>
      <Header urlPath={store}/>
      <Home/>
      </Route>
      <Switch>
      <Route path={store} exact>
      <Header/>
      <Products />
      </Route>
      <Route path={`${store}/:product`} >
      <ProductDetails/>
      </Route>
      </Switch>
      <Route path={contact}>
        <ContactPage/>
      </Route>
      <Route path='/Login'>
        <Login/>
      </Route>
      <Footer/>
      </div>
    </div>
    </ContextProvider>
  );
}

export default App;
