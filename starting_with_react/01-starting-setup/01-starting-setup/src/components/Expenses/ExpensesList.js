import './ExpensesList.css';
import ExpenseItem from './ExpenseItem';


const ExpensesList = (props)=>{
let expMessage;
if(props.items.length === 0){
    return <h2 className = 'expenses-list__fallback' >No expenses found</h2>
}
if(props.items.length === 1){
    expMessage = <p>Only single Expense here. Please add more...</p>;
}
    return(
        <ul className='expenses-list'>
        {props.items.map((item)=>{
            return <ExpenseItem key = {item.id} title = {item.title} amount = {item.amount} date = {item.date}/> 
        })}
        {expMessage}
        </ul>
        
    )
}

export default ExpensesList;