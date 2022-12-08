import ExpenseItem from './ExpenseItem';
import classes from './ExpenseList.module.css';
import Button from '../UI/Button';
import {useSelector,useDispatch} from 'react-redux';
import {Fragment} from 'react';
import PremiumFeatures from './PremiumFeatures';
import {premiumAction} from '../../store/Premium';

const ExpenseList = (props)=>{
     
    //get expense details
    const total = useSelector((state)=>state.expense.total);
    const dispatch = useDispatch();
    console.log(total);


    return(
        <div className={classes.main}>
        <div className={classes.amt}>
        <span>Total Amount : {total}</span>
                {
                    total >= 10000 && 
                    <PremiumFeatures expenses = {props.expenses}/> 
                }
        </div>
            <div className={classes.container}>
                <div className={classes.heading}>
                    <div className={classes.col}>Amount</div>
                    <div className={classes.col}>Description </div>
                    <div className={classes.col}>Category</div>
                </div> 
                 {props.expenses.map((expense)=>{ 
                    return <ExpenseItem key = {expense.id}
                    expense = {expense} 
                    editExpense = {props.editExpense}/>
                }) }
            </div>
            </div>
      
    );
}
export default ExpenseList;