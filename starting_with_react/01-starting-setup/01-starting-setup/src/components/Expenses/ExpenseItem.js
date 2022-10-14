import './ExpenseItem.css';
import ExpenseDate from './ExpenseDate.js';
import ExpenseDetails from './ExpenseDetails.js';
import Card from '../UI/card.js';

const ExpenseItem = (props) => {
    const clickHandler = () => {
        console.log("clicked");
    }
    return (
        <Card className="expense-item">
            <ExpenseDate date={props.date} />
            <ExpenseDetails title={props.title} amount={props.amount}/>
            <button onClick={clickHandler}>Delete</button>
        </Card>
    );
};

export default ExpenseItem;