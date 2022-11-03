import Header from './Components/Layout/Header';
import Summary from './Components/Meals/Summary';
import Meals from './Components/Meals/Meals';
import Cart from './Components/Cart/Cart';
function App() {
  return (
    <div>
      <Header/>
      <Cart/>
      <Summary/>
      <Meals/>
    </div>
  );
}

export default App;