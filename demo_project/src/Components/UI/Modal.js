import './Modal.css';
import Button from './Button';
import Card from './Card';

const Modal = (props) =>{
    const onClickHandler = (event)=>{
        if(event.target === event.currentTarget)
        props.closeModal(false);
    }
        return(
            <div className='modal' onClick = {onClickHandler}>
            <Card className = 'modal-content' onClick ={onClickHandler}>
                <h2 className = 'header_style'>{props.title}</h2>  
                <p>{props.message}</p>
                <Button className = 'close' onClick = {onClickHandler}>Okay</Button>
            </Card>
            </div>
        )
}
export default Modal;