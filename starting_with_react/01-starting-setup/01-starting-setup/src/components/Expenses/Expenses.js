import ExpenseItem from './ExpenseItem';
import './Expenses.css';
import Card from '../UI/card.js';
import ExpensesFilter from './ExpenseFilter';
import {useState} from 'react';
const Expenses = (props) => {
    // let expCompArr = [];
    const [year, setYear] = useState('2019');

    const changeYear = year =>{
        setYear(year);
        console.log(year);
    }

    const expCompArr = props.items.map((item)=>{
        return <ExpenseItem key = {item.id} title = {item.title} amount = {item.amount} date = {item.date}/> 
    })
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