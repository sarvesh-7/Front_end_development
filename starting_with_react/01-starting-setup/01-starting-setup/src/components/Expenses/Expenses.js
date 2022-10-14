import ExpenseItem from './ExpenseItem';
import './Expenses.css';
import Card from '../UI/card.js';
const Expenses = (props) => {
    let expCompArr = [];
    for (let i = 0; i < props.items.length; i++) {
        expCompArr.push (
            <ExpenseItem title={
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
        <Card className="expenses">
            {expCompArr}
        </Card>
        
    );
}

 export default Expenses;