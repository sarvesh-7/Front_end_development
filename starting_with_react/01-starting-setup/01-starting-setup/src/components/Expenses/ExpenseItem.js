import React, {useState} from 'react';
import './ExpenseItem.css';
import ExpenseDate from './ExpenseDate.js';
import ExpenseDetails from './ExpenseDetails.js';
import Card from '../UI/card.js';

const ExpenseItem = (props) => {
    const [title, setTitle] = useState(props.title);
    const [expAmt, setExpense] = useState(props.amount);
    return (
        <li>
        <Card className="expense-item">
            <ExpenseDate date={props.date} />
            <ExpenseDetails title={title} amount={expAmt}/>
        </Card>
        </li>
    );
};

export default ExpenseItem;