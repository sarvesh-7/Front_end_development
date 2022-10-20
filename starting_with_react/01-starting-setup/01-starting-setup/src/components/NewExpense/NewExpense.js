import ExpenseForm from './ExpenseForm';
import './NewExpense.css';
import {useState} from 'react';

const NewExpense = (props) => {

    //set state for add new expense button
    const[addExpBtn,setClicked] = useState('');
    let expComp;

    const saveExpenseData = (expenseDataObj) =>{
        let expenseData = {
            id : Math.random().toString(),
            ...expenseDataObj  
        }
        props.onAddExpense(expenseData);
    }

    const clickHandler = e =>{
        setClicked('clicked');
    }

    const cancelExpense = ()=>{
        setClicked('');
    }

    //if button is clicked then display form by re - rendering this component
    if(addExpBtn==='clicked'){
        expComp = <ExpenseForm onSaveExpenseData = {saveExpenseData} onCancelExpense = {cancelExpense}/>;
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