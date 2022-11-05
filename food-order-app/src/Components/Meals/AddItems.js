import classes from './AddItems.module.css';
import {useContext,useRef, useReducer} from 'react';
import CartContext from '../../Store/CartContext';
import CartButton from '../Layout/CartButton';

const AddItems = (props)=>{
    const itemAmt = useRef();
    const cartCtx = useContext(CartContext);
    const addItemstoCart = (event)=>{
        event.preventDefault();
        if(itemAmt.current.value!=='')
        {
            props.meal.quantity = Number(itemAmt.current.value);
            cartCtx.addItem(props.meal);
        }   
    }
    return(
        <form>
            <label htmlFor='ItemAmt'>Amount</label>
            <input type='number' ref={itemAmt} id='ItemAmt' min='1' step='1'/><br/>
            <button type='submit' onClick = {addItemstoCart} className={classes.addButton}>+ Add</button>
        </form>
    )
}
export default AddItems;