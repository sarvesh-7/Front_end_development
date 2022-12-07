import classes from './ExpenseForm.module.css';
import {useRef, Fragment, useState} from 'react';
import Button from '../UI/Button';
import ExpenseList from './ExpenseList';
import axios from 'axios';
import {useSelector,useDispatch} from 'react-redux';
import {expenseAction} from '../../store/Expense';

const ExpenseForm = ()=>{

    //firebase database URL path
    const url = 'https://expense-tracker-d3062-default-rtdb.firebaseio.com';

     //firebase database URL path for update
     const updateUrl = 'https://expense-tracker-d3062-default-rtdb.firebaseio.com';

    const dispatch = useDispatch();
    const expenseList = useSelector((state)=>state.expense.expenseList);

    console.log(expenseList);

    //get expense details entered by user
    const amountRef = useRef();
    const descRef = useRef();
    const categoryRef = useRef();

    //check if user is editing existing expense details
    const[isEditing,setIsEditing] = useState();


    const submitExpenseHandler=async(e)=>{
        e.preventDefault();
        const expObj = {
            amount : amountRef.current.value,
            description : descRef.current.value,
            category : categoryRef.current.value
        };
        //update expense details into firebase database
        const res = await axios.post(`${url}/expense.json`, expObj);
        console.log('res', res);

        if(res.status===200){
            alert('Expense stored in database successfully');
           const expense = {
               id : res.data.name,
               ...expObj
           };
        dispatch(expenseAction.addExpense(expense));
        }
        else{
            alert('Error while storing expense details ');
        }

    }

    const editExpense=(expense)=>{
        //update expense details into form inputs using ref
        amountRef.current.value = expense.amount;
        descRef.current.value = expense.description;
        categoryRef.current.value = expense.category;
        setIsEditing(expense.id);
    };

    const editExpenseHandler=async(e)=>{
        e.preventDefault();
        //update expense details into backend and show it into frontend
        const expObj = {
            id : isEditing,
            amount : amountRef.current.value,
            description : descRef.current.value,
            category : categoryRef.current.value
        };
        
        const res = await axios.put(`${updateUrl}/expense/${expObj.id}.json`, expObj);
        if(res.status===200)
        console.log('expense edited successfully');
        dispatch(expenseAction.addExpense(expObj));
        setIsEditing(false);
    }

    return(
        <Fragment>
        <form className={classes.expenseForm}>
            <label htmlFor='exp_amt'>Amount</label>
            <input type='number' id='exp_amt' ref={amountRef}/>
            <label htmlFor='exp_desc'>Description</label>
            <input type='text' id='exp_desc' ref={descRef}/>
            <label htmlFor='exp_cat'>Category</label>
            <select name='exp_cat' id='exp_cat' ref={categoryRef}>
            <option value='Entertainment'>Entertainment</option>
            <option value='Bills'>Bills</option>
            <option value='Food'>Food</option>
            <option value='Loan'>Loan</option>
            <option value='healthcare'>healthcare</option>
            </select>
            {
                !isEditing &&
                <Button type='submit' onClick={submitExpenseHandler} className={classes.expenseButton}>
                Add Expense
                </Button> 
            }
            {
                isEditing &&
                <Button type='submit' onClick={editExpenseHandler} className={classes.expenseButton}>
                Edit Expense
                </Button>
            } 
        </form>
        <ExpenseList expenses = {expenseList} editExpense={editExpense}/>
        </Fragment>
    )
};
export default ExpenseForm;