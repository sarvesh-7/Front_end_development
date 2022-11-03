import classes from './Modal.module.css';
import {Fragment} from 'react';
import ReactDOM from 'react-dom';
const Modal = (props)=>{
    const modalOverlay = document.getElementById('modal-overlay');
return(
    <Fragment>
        {ReactDOM.createPortal(
            <div className={classes.backdrop}>
            <div className={classes.modal}>
                {props.children}
            </div>
        </div>, modalOverlay
        )}
    
    </Fragment>
)
}
export default Modal;