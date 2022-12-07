import classes from './ExpenseItem.module.css';
import Button from '../UI/Button';
import {useDispatch} from 'react-redux';
import {expenseAction} from '../../store/Expense';
import axios from 'axios';

const ExpenseItem = (props)=>{;
    const dispatch = useDispatch();

    //firebase database URL path
    const url = 'https://expense-tracker-d3062-default-rtdb.firebaseio.com';

    const removeExpense=async()=>{

        //need to remove from screen as well as backend
            const res = await axios.delete(`${url}/expense/${props.expense.id}.json`);
            if(res.status===200)
            console.log('expense deleted successfully');
            dispatch(expenseAction.removeExpense(props.expense));
    }

    //edit expenses
    const editExpense=()=>{
        //remove expense from screen only
        dispatch(expenseAction.removeExpense(props.expense));

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