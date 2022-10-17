import ExpenseForm from './ExpenseForm';
import './NewExpense.css';

const NewExpense = (props) => {

    const saveExpenseData = (expenseDataObj) =>{
        let expenseData = {
            id : Math.random().toString(),
            ...expenseDataObj  
        }
        props.onAddExpense(expenseData);
    }
    return (
        <div className="new-expense">
            <ExpenseForm onSaveExpenseData = {saveExpenseData}/>
        </div>
    )
};

export default NewExpense;