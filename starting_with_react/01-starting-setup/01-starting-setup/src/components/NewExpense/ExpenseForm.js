import './ExpenseForm.css';
function ExpenseForm(){
    function display(e){
        console.log(e.target.value);
    }
    return(
        <form>
        <div className="new-expense__controls">
        <div className="new-expense__controls">
        <label htmlFor="exp_title">Expense Title</label>
        <input type="text" id="exp_title" onChange={display}/>
        </div>

        <div className="new-expense__controls">
        <label htmlFor="exp_amt">Expense Amount</label>
        <input type="number" id="exp_amt" min="1" step="1" onChange={display}/>
        </div>

        <div className="new-expense__controls">
        <label htmlFor="exp_date">Expense Date</label>
        <input type="date" id="exp_date" min="2019-01-01" max="2022-12-31" onChange={display}/>
        </div>
        </div>

        <div className="new-expense__actions">
        <button type="submit">Add Expenses</button>
        </div>

        </form>
    )
};

export default ExpenseForm;