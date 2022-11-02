import classes from './Card.module.css';
const Card = (props) => {
    const card_classes = props.className + ' ' + classes.card;
    return (
        <div className ={card_classes}> 
        {props.children}
        </div>
    )
}
export default Card;
