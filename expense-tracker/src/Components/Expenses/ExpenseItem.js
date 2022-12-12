import classes from './ExpenseItem.module.css';
import Button from '../UI/Button';
import {useDispatch,useSelector} from 'react-redux';
import {expenseAction} from '../../store/Expense';
import axios from 'axios';
import React,{Fragment,useState} from 'react';
import LoadingSpinner from '../UI/LoadingSpinner';

const ExpenseItem = (props)=>{;
    const dispatch = useDispatch();

    const[status,setStatus] = useState();

    //firebase database URL path
    const url = 'https://expense-tracker-d3062-default-rtdb.firebaseio.com';

      //get user's email address
      const emailID = useSelector(state=>state.auth.email);

    const removeExpense=async()=>{

        //need to remove from screen as well as backend
        setStatus('pending');
            const res = await axios.delete(`${url}/${emailID}/${props.expense.id}.json`);
            if(res.status===200)
            {
              setStatus('completed');
              console.log('expense deleted successfully');
              dispatch(expenseAction.removeExpense(props.expense));
            }
    }

    //edit expenses
    const editExpense=()=>{
        //remove expense from screen only
        dispatch(expenseAction.removeExpense(props.expense));

          //show expense inputs on to expense form so user can edit it
          props.editExpense(props.expense);
       
    }

    return(
      <Fragment>
         {
            status === 'pending' &&
            <div className={classes.spinner}>
            <LoadingSpinner/>
            </div>
            }
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
        </Fragment>
    ) 
};
export default ExpenseItem;