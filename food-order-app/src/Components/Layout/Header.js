import classes from './Header.module.css';
import mealsImg from '../../Assets/meals.jpg';
import {Fragment} from 'react';
import Button from './CartButton';

//Header of the app
const Header = ()=>{
return (
    <Fragment>
    <header className={classes.header}>
        <h1>ReactMeals</h1>
        <Button/>
    </header>
    <div className={classes['main-image']}>
    <img src={mealsImg} alt='An image full of delicios meals'/>
    </div>
    </Fragment>
)
}
export default Header;