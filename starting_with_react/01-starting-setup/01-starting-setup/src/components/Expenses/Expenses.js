import './Expenses.css';
import Card from '../UI/card.js';
import ExpensesFilter from './ExpenseFilter';
import {useState} from 'react';
import ExpensesList from './ExpensesList';
import ExpenseChart from './ExpenseChart';

const Expenses = (props) => {

    //maintain state for the filtered year
    const [year, setYear] = useState('2021');
    var expFilteredArr = props.items;

    //update year state
    const changeYear = year =>{
        setYear(year);
    }

    //filter array based on year selected from dropdown
        expFilteredArr = props.items.filter(expense=>{
            return expense.date.getFullYear() == year;
        });

    return(
        <div>
        <Card className="expenses">
        {/*expense filter component */}
        <ExpensesFilter selected = {year} onChangeYear = {changeYear} />
        {/* display expense chart for filtered year */}
        <ExpenseChart expenses = {expFilteredArr} />
        {/* display filtered expense list */}
            <ExpensesList items={expFilteredArr}/> 
        </Card>
        </div>
        
    );
}

 export default Expenses;