import classes from './ExpenseForm.module.css';
import {useRef, Fragment,useState} from 'react';
import Button from '../UI/Button';
import ExpenseList from './ExpenseList';

const ExpenseForm = ()=>{

    const[expList, setExpList] = useState([]);

    //get expense details entered by user
    const amountRef = useRef();
    const descRef = useRef();
    const categoryRef = useRef();


    const submitExpenseHandler=(e)=>{
        e.preventDefault();
        const expObj = {
            id : Math.random(),
            amount : amountRef.current.value,
            description : descRef.current.value,
            category : categoryRef.current.value
        }
        setExpList((expList)=>[...expList,  expObj]);
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
            <Button type='submit' onClick={submitExpenseHandler} className={classes.expenseButton}>
            Add Expense
            </Button>
        </form>
        <ExpenseList expenses = {expList}/>
        </Fragment>
    )
};
export default ExpenseForm;