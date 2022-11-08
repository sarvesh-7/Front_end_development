import classes from './AddMeals.module.css';
import {useContext,useRef} from 'react';
import CartContext from '../../Store/CartContext';

const AddItems = (props)=>{
    const itemAmt = useRef();
    const cartCtx = useContext(CartContext);
    
    //add items to the cart when clicked on add button on each meal
    const addItemstoCart = (event)=>{
        event.preventDefault();
        if(itemAmt.current.value!=='')
        {
            props.meal.quantity = +itemAmt.current.value;
            cartCtx.addItem(props.meal); //call context additem method to update context items array
        }   
    }
    return(
        <form>
            <label htmlFor='ItemAmt'>Amount</label>
            <input type='number' ref={itemAmt} id='ItemAmt' min='1' max = '10' step='1' /> 
            <br/>
            <button type='submit' onClick = {addItemstoCart} className={classes.addButton}>+ Add</button>
        </form>
    )
}
export default AddItems;