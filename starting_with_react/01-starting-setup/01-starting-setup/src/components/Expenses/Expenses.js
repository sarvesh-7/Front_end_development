import ExpenseItem from './ExpenseItem';
import './Expenses.css';
import Card from '../UI/card.js';
import ExpensesFilter from './ExpenseFilter';
import {useState} from 'react';
const Expenses = (props) => {
    let expCompArr = [];
    const [year, setYear] = useState('2019');

    const changeYear = year =>{
        setYear(year);
        console.log(year);
    }
    for (let i = 0; i < props.items.length; i++) {
        expCompArr.push (
            <ExpenseItem key={
                props.items[i].id
            }
            title={
                props.items[i].title
                }
                amount={
                    props.items[i].amount
                }
                date={
                    props.items[i].date
                }
            ></ExpenseItem>
        );
    };
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