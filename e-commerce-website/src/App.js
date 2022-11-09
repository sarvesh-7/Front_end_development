import logo from './logo.svg';
import './App.css';
import NavBar from './Components/Layout/NavBar';
import Header from './Components/Layout/Header';
import Products from './Components/Products/Products';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Header/>
      <Products/>
    </div>
  );
}

export default App;
