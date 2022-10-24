import './Modal.css';
import Button from './Button';
import Card from './Card';
import ReactDOM from 'react-dom';
import {Fragment} from 'react';

//model component
const ModelComp = (props) =>{
    return (<div className='modal' onClick = {props.onClickHandler}>
        <Card className = 'modal-content' onClick ={props.onClickHandler}>
            <h2 className = 'header_style'>{props.title}</h2>  
            <p>{props.message}</p>
            <Button className = 'close' onClick = {props.onClickHandler}>Okay</Button>
        </Card>        
    </div>);
}


const Modal = (props) =>{

    const onClickHandler = (event)=>{
        if(event.target === event.currentTarget)
        props.closeModal(false);
    }
        return(
            <Fragment>
                {
                ReactDOM.createPortal(<ModelComp onClickHandler = {onClickHandler} 
                    message = {props.message} title = {props.title} />,
                    document.getElementById('modal'))  
               }
            </Fragment>
        )
}
export default Modal;