import './ExpenseForm.css';
import {useState} from 'react';

function ExpenseForm(){
    //register states for expense amount, title and date
    const [enteredTitle, setEnteredTitle] = useState('');
    const [enteredAmount, setEnteredAmount] = useState('');
    const [enteredDate, setEnteredExpDate] = useState('');

    //update expense amount, title and date states when user make changes in the input fields
    function changeTitleHandler(e){
        setEnteredTitle(e.target.value);
    }

    function changeAmountHandler(e){
        setEnteredAmount(e.target.value);
    }

    function changeDateHandler(e){
        setEnteredExpDate(e.target.value);
    }

    //return a form to add new expenses
    return(
        <form>
        <div className="new-expense__controls">
        <div className="new-expense__controls">
        <label htmlFor="exp_title">Expense Title</label>
        <input type="text" id="exp_title" onChange={changeTitleHandler}/>
        </div>

        <div className="new-expense__controls">
        <label htmlFor="exp_amt">Expense Amount</label>
        <input type="number" id="exp_amt" min="1" step="1" onChange={changeAmountHandler}/>
        </div>

        <div className="new-expense__controls">
        <label htmlFor="exp_date">Expense Date</label>
        <input type="date" id="exp_date" min="2019-01-01" max="2022-12-31" onChange={changeDateHandler}/>
        </div>
        </div>

        <div className="new-expense__actions">
        <button type="submit">Add Expenses</button>
        </div>

        </form>
    )
};

export default ExpenseForm;