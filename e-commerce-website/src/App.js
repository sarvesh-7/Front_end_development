import logo from './logo.svg';
import './App.css';
import NavBar from './Components/Layout/NavBar';
import Header from './Components/Layout/Header';
import {Route,Redirect,Switch} from 'react-router-dom';
import React,{useContext,Suspense} from 'react';
import Footer from './Components/Layout/Footer';
import Login from './Pages/Auth/Login';
import CartContext from './Components/store/CartContext';

//lazy loading for all components except Home,NavBar component
const About = React.lazy(()=>import('./Pages/About'));
const ContactPage = React.lazy(()=>import('./Pages/ContactPage'));
const Products = React.lazy(()=>import('./Components/Products/Products'));
const ProductDetails = React.lazy(()=>import('./Pages/ProductDetails'));
const Home = React.lazy(()=>import('./Pages/Home'));

function App() {
  const cartCtx = useContext(CartContext);
  return (

    <div className="App">
      <NavBar/>
      <Suspense fallback={<p>Loading..</p>}>
      <div className='container'>
      <Route path='/about'><About/></Route>
      <Route exact path='/'>
        <Redirect to='/Login'/>
        </Route>
      <Route path='/Home'>
      <Header urlPath='/Store'/>
      <Home/>
      </Route>
      <Switch>
          <Route path='/Store' exact>
            {
              cartCtx.token && <React.Fragment>
                <Header/>
                <Products />
              </React.Fragment>
            }
            {
              !cartCtx.token && <Redirect to='/Login'/>
            }
          </Route>

          <Route path={`/Store/:product`} >
            {
              cartCtx.token && <React.Fragment>
                <ProductDetails/>
              </React.Fragment>
            }
            {
              !cartCtx.token && <Redirect to='/Login'/>
            }
          </Route>
      </Switch>
      <Route path='/Contact'>
        <ContactPage/>
      </Route>
      <Route path='/Login'>
        <Login/>
      </Route>
      <Footer/>
      </div>
      </Suspense>
    </div>
  );
}

export default App;
