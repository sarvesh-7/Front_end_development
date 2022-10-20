import ExpenseForm from './ExpenseForm';
import './NewExpense.css';
import {useState} from 'react';

const NewExpense = (props) => {

    //set state to check if user is editing form or not
    const[isEditing,setIsEditing] = useState(false);

    //variable to store JSX code to be rendered on screen
    let expComp;

    const saveExpenseData = (expenseDataObj) =>{
        let expenseData = {
            id : Math.random().toString(),
            ...expenseDataObj  
        }
        props.onAddExpense(expenseData);
        setIsEditing(false);
    }

    const clickHandler = e =>{
        setIsEditing(true);
    }

    const cancelEditing = ()=>{
        setIsEditing(false);
    }

    //if add new expense button is clicked then display form by re - rendering this component
    if(isEditing){
        expComp = <ExpenseForm onSaveExpenseData = {saveExpenseData} onCancelEditing = {cancelEditing}/>;
    }
    //display button initially when the component loads first time or when clicked on cancel button
    else{
        expComp = <div className="new-expense__add">
                    <button onClick = {clickHandler}>Add Expenses</button>
                  </div>
    }
    return (
        <div className="new-expense">
            {expComp}
        </div>
    )
};

export default NewExpense;