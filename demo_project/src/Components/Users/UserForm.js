import {useState} from 'react';
import Modal from '../UI/Modal';
import './UserForm.css';
import Card from '../UI/Card';
import Button from '../UI/Button';

const UserForm = (props)=>{

    //maintain state for username and age
    const[userName, setUserName] = useState('');
    const[userAge, setUserAge] = useState('');

    //state to check if input is valid or invalid
    // const[errMsg, setErrMsg] = useState('');
    // const[modal, displayModal] = useState(false);
    const[errorModel, setErrorModel] = useState(); 

    let errorInfo = '';

    //submit user details
    const onSubmitHandler = e => {
        e.preventDefault();
        if(userName.trim() === '' || userAge === '' ){
            errorInfo = 'Please enter a valid name and age (non-empty values)';
            setErrorModel({title : 'Invalid input' , message : errorInfo  });
        }
        else if(+userAge <= 0 )
        {
            errorInfo = 'Please enter a valid age (> 0)';
            setErrorModel({title : 'Invalid input' , message : errorInfo  });
        }
        else
        {
            props.submitUserDetails(userName, userAge);
            setUserName('');
            setUserAge('');
        };
        // if(errorInfo){
        //     setErrMsg(errorInfo);
        //     displayModal(true);
        // }
    };

    const changeNameHandler = e =>{
        setUserName(e.target.value);
    }

    const changeAgeHandler = e =>{
        setUserAge(e.target.value);
    }

       //close modal when clicked on okay button
       const closeModal = () =>{
        // displayModal(false);
        setErrorModel(null);
    }

    return (
        <div>
        <Card>
        <form className = 'form-content' onSubmit = {onSubmitHandler}>
            <label>Username</label><br/>
            <input type='text' value = {userName} onChange = {changeNameHandler}/><br/>
            <label>Age (Years)</label><br/>
            <input type='number' value = {userAge} onChange = {changeAgeHandler}/><br/>
            <Button type='submit'>Add User</Button>
        </form>
        </Card>
        {errorModel && <Modal title = {errorModel.title}
        message = {errorModel.message} closeModal = {closeModal}/>} 
        </div>
    )
};

export default UserForm;