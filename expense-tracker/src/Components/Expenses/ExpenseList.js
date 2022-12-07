import ExpenseItem from './ExpenseItem';
import classes from './ExpenseList.module.css';
import {useSelector} from 'react-redux';

const ExpenseList = (props)=>{
     
    //get expense details
    const total = useSelector((state)=>state.expense.total);
    console.log(total);

    return(

            <div className={classes.container}>
                <span>Total Amount : {total}</span>
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
      
    );
}
export default ExpenseList;