import logo from './logo.svg';
import './App.css';
import NavBar from './Components/Layout/NavBar';
import Header from './Components/Layout/Header';
import Products from './Components/Products/Products';
import ContextProvider from './Components/store/ContextProvider';

function App() {
  return (
    <ContextProvider>
    <div className="App">
      <NavBar/>
      <Header/>
      <Products/>
    </div>
    </ContextProvider>
  );
}

export default App;
