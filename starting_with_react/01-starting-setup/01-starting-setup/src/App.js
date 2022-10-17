import Expenses from './components/Expenses/Expenses';
import NewExpense from './components/NewExpense/NewExpense';
import {useState} from 'react';
const expenses = [
    {
        id : 'e1',
        title: 'Laptop',
        amount: 940.12,
        date: new Date(2020, 7, 14)
    }, 
    {   
        id : 'e2',
        title: 'New TV',
        amount: 799.49,
        date: new Date(2021, 2, 12)
    },
    {  
        id : 'e3', 
        title: 'Car Insurance',
        amount: 294.67,
        date: new Date(2021, 2, 28)
    },
    {
        id: 'e4',
        title: 'New Desk (Wooden)',
        amount: 450,
        date: new Date(2021, 5, 12)
    },
];


const App = () => {

//maintain state for expense array
const [expArray, setExpArray] = useState(expenses);

const addExpense = expense =>{
    setExpArray([...expArray, expense]); //update expense array state by adding new expense
}
    return (
        <div>
            <NewExpense onAddExpense = {addExpense}/>
            <Expenses items={expArray}/>
        </div>
    );
};

export default App;
