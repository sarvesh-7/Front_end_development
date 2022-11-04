import classes from './Modal.module.css';
import {Fragment} from 'react';
import ReactDOM from 'react-dom';

const Backdrop = (props)=>{
    return(
        <div onClick = {props.onClose} className={classes.backdrop}></div>
    )
}
const ModalOverlay = (props)=>{
    return(
        <div className={classes.modal}>
            {props.children}
        </div>
    )
}
const Modal = (props)=>{
    const modalOverlay = document.getElementById('modal-overlay');

return(
    <Fragment>
        {ReactDOM.createPortal(<Backdrop onClose = {props.onClose}/>,modalOverlay)}
        {ReactDOM.createPortal(<ModalOverlay>{props.children}
        </ModalOverlay>,modalOverlay)}
    </Fragment>
)
}
export default Modal;