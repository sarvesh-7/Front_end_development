import ExpenseItem from './ExpenseItem';
import './Expenses.css';
import Card from '../UI/card.js';
import ExpensesFilter from './ExpenseFilter';
import {useState} from 'react';
const Expenses = (props) => {

    const [year, setYear] = useState('2021');
    var expFilteredArr = props.items;

    const changeYear = year =>{
        setYear(year);
    }

        expFilteredArr = props.items.filter(expense=>{
            return expense.date.getFullYear() == year;
        });

    const expCompArr = expFilteredArr.map((item)=>{
        return <ExpenseItem key = {item.id} title = {item.title} amount = {item.amount} date = {item.date}/> 
    });

    return(
        <div>
        <Card className="expenses">
        <ExpensesFilter selected = {year} onChangeYear = {changeYear} />
            {expCompArr}
        </Card>
        </div>
        
    );
}

 export default Expenses;