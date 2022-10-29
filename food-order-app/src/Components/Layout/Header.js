import './Header.css';
import restuarantCover from '../Images/restaurant-cover.jpg';

const Header = ()=>{
return (
    <div>
    <div className='header'>
        <span className='header-title'>ReactMeals</span>
        <div className='cart'>
        <i className="material-icons">shopping_cart</i>
        <span>Your Cart</span>
        <div className='cart-value'>0</div>
        </div>
    </div>
    <img src={restuarantCover}/>
    </div>
)
}
export default Header;