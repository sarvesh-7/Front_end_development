import ExpenseForm from './ExpenseForm';
import './NewExpense.css';
import useState from 'react';
const NewExpense = () => {
    return (
        <div className="new-expense">
            <ExpenseForm/>
        </div>
    )
};

export default NewExpense;