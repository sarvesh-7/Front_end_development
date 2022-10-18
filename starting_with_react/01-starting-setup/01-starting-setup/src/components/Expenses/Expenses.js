import './Expenses.css';
import Card from '../UI/card.js';
import ExpensesFilter from './ExpenseFilter';
import {useState} from 'react';
import ExpensesList from './ExpensesList';
const Expenses = (props) => {

    const [year, setYear] = useState('2021');
    var expFilteredArr = props.items;
    // let expContent;
    // let expMessage;

    const changeYear = year =>{
        setYear(year);
    }

        expFilteredArr = props.items.filter(expense=>{
            return expense.date.getFullYear() == year;
        });

        // if(expFilteredArr.length===0){
        //     expContent = <p>No expenses found </p>;
        // }
        // else{
        //     expContent = expFilteredArr.map((item)=>{
        //         return <ExpenseItem key = {item.id} title = {item.title} amount = {item.amount} date = {item.date}/> 
        //     });
        // }

        // if(expFilteredArr.length === 1){
        //     expMessage = <p> Only single Expense here. Please add more...</p>;
        // }

    return(
        <div>
        <Card className="expenses">
        <ExpensesFilter selected = {year} onChangeYear = {changeYear} />
            {/* {expContent}
            {expMessage} */}
            <ExpensesList items={expFilteredArr}/>
        </Card>
        </div>
        
    );
}

 export default Expenses;