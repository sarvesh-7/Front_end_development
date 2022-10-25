import {useState,useRef, Fragment} from 'react';
import Modal from '../UI/Modal';
import './UserForm.css';
import Card from '../UI/Card';
import Button from '../UI/Button';
// import Wrapper from '../Helper/Wrapper';

const UserForm = (props)=>{

    //create ref to get access to name,college and age input element from DOM
    const nameInputRef = useRef();
    const ageInputRef = useRef(); 
    const collegeInputRef = useRef();

    //state to check if input is valid or invalid
    // const[errMsg, setErrMsg] = useState('');
    // const[modal, displayModal] = useState(false);
    const[errorModel, setErrorModel] = useState(); 

    let errorInfo = '';

    //submit user details
    const onSubmitHandler = e => {
        e.preventDefault();
        //update Ref for username,college and age based on input entered by user
        const enteredName = nameInputRef.current.value;
        const enteredAge = ageInputRef.current.value;
        const enteredCollege = collegeInputRef.current.value;

        if(enteredName.trim() === '' || enteredAge === '' || enteredCollege.trim() === ''){
            errorInfo = 'Please enter a valid name, age and college (non-empty values)';
            setErrorModel({title : 'Invalid input' , message : errorInfo  });
        }
        else if(+enteredAge <= 0 )
        {
            errorInfo = 'Please enter a valid age (> 0)';
            setErrorModel({title : 'Invalid input' , message : errorInfo  });
        }
        else
        {
            props.submitUserDetails(enteredName, enteredAge, enteredCollege);
            nameInputRef.current.value = '';
            ageInputRef.current.value = ''; 
            collegeInputRef.current.value = '';  
        };
    };

       //close modal when clicked on okay button
       const closeModal = () =>{
        // displayModal(false);
        setErrorModel(null);
    }

    return (
        <Fragment>
        <Card>
        <form className = 'form-content' onSubmit = {onSubmitHandler}>
            <label>Username</label><br/>
            <input type='text'  ref = {nameInputRef} /><br/>
            <label>Age (Years)</label><br/>
            <input type='number' ref = {ageInputRef} /><br/>
            <label>College</label><br/>
            <input type='text' ref = {collegeInputRef} /><br/>
            <Button type='submit'>Add User</Button>
        </form>
        </Card>
        {errorModel && <Modal title = {errorModel.title}
        message = {errorModel.message} closeModal = {closeModal}/>} 
        </Fragment>
    )
};

export default UserForm;