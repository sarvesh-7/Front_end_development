import classes from './AddItems.module.css';
const AddItems = ()=>{
    return(
        <form>
            <label htmlFor='ItemAmt'>Amount</label>
            <input type='number' id='ItemAmt'/><br/>
            <button type='submit' className={classes.addButton}>+ Add</button>
        </form>
    )
}
export default AddItems;