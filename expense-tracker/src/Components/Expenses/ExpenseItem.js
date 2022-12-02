import classes from './ExpenseItem.module.css';
import Button from '../UI/Button';
import ExpContext from '../Store/ExpContext';
import { useContext } from 'react';

const ExpenseItem = (props)=>{;
    const expCtx = useContext(ExpContext);

    const removeExpense=()=>{
        expCtx.removeExpense(props.expense,false);
    }

    //edit expenses
    const editExpense=()=>{
        //remove expense from screen only
        expCtx.removeExpense(props.expense,true);
        //show expense inputs on to expense form so user can edit it
        props.editExpense(props.expense);
       
    }

    return(
            <div className={classes['table-row']} id='expDiv'>
            <div className={classes.col}>{props.expense.amount}</div>
            <div className={classes.col}>{props.expense.description}</div>
            <div className={classes.col}>{props.expense.category}</div>
            <Button className={classes.expense} onClick={removeExpense}>Delete</Button>
            <Button className={classes.expense} onClick={editExpense}>Edit</Button>
            </div>
        
    ) 
};
export default ExpenseItem;