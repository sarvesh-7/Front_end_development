import classes from './ExpenseForm.module.css';
import {useRef, Fragment, useContext, useState} from 'react';
import Button from '../UI/Button';
import ExpenseList from './ExpenseList';
import ExpContext from '../Store/ExpContext';
import axios from 'axios';

const ExpenseForm = ()=>{

    //get expense details entered by user
    const amountRef = useRef();
    const descRef = useRef();
    const categoryRef = useRef();

    //check if user is editing existing expense details
    const[isEditing,setIsEditing] = useState();

    const expCtx = useContext(ExpContext);

    const submitExpenseHandler=async(e)=>{
        e.preventDefault();
        const expObj = {
            amount : amountRef.current.value,
            description : descRef.current.value,
            category : categoryRef.current.value
        };
        expCtx.addExpense(expObj);
    }

    const editExpense=(expense)=>{
        //update expense details into form inputs using ref
        amountRef.current.value = expense.amount;
        descRef.current.value = expense.description;
        categoryRef.current.value = expense.category;
        setIsEditing(expense.id);
    };

    const editExpenseHandler=(e)=>{
        e.preventDefault();
        //update expense details into backend and show it into frontend
        const expObj = {
            id : isEditing,
            amount : amountRef.current.value,
            description : descRef.current.value,
            category : categoryRef.current.value
        };
        expCtx.editExpense(expObj);
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
        <ExpenseList expenses = {expCtx.expenseList} editExpense={editExpense}/>
        </Fragment>
    )
};
export default ExpenseForm;