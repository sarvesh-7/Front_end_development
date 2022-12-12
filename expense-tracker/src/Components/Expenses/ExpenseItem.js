import classes from './ExpenseItem.module.css';
import Button from '../UI/Button';
import {useDispatch,useSelector} from 'react-redux';
import {expenseAction} from '../../store/Expense';
import axios from 'axios';
import React,{Fragment} from 'react';

const ExpenseItem = (props)=>{;
    const dispatch = useDispatch();

    //firebase database URL path
    const url = 'https://expense-tracker-d3062-default-rtdb.firebaseio.com';

      //get user's email address
      const emailID = useSelector(state=>state.auth.email);

    const removeExpense=async()=>{

        //need to remove from screen as well as backend
            const res = await axios.delete(`${url}/${emailID}/${props.expense.id}.json`);
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
            <Button className={classes.expense} onClick={removeExpense}>
              <i className='fa fa-trash-o'></i> 
              </Button>
            <Button className={classes.expense} onClick={editExpense}>
              <i className='fa fa-edit'></i>
              </Button>
            </div>
    ) 
};
export default ExpenseItem;