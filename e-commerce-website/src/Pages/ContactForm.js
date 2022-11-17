import React, {useRef} from 'react';
import classes from './ContactForm.module.css';
import Button from '../Components/UI/Button';

const Contact = props => {

    const usrName = useRef();
    const usrEmail = useRef();
    const usrPhone = useRef();

    function ValidateEmail(mail) {
        const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (mail.match(emailFormat)) {
            return true;
        } else {
            alert('please enter valid email address');
            return false;
        }
    }

    function ValidatePhone(phone) {
        var phoneFormat = /^\d{10}$/; 
        if(phone.match(phoneFormat)){
            return true;
        }
        else{
            alert('please enter valid mobile number');
            return false;
        }
    }
    // submit handler function

    const submitDetails = (e) => {
        e.preventDefault();
        const name = usrName.current.value;
        const email = usrEmail.current.value;
        const phone = usrPhone.current.value;

        if (name === '' || email === '' || phone === '') {
            alert('Please fill all fields');
            return;
        }

        if (! ValidateEmail(email)) {
            return;
        }

        if(!ValidatePhone(phone)){
            return;
        }

        const userData = {
            name: usrName.current.value,
            email: usrEmail.current.value,
            phone: usrPhone.current.value
        };
        props.onSubmitForm(userData);
    }

    return (
        <form className={
            classes.contactForm
        }>
            <label forhtml='name'>Name</label>
            <input type='text' id='name'
                ref={usrName}/>
            <label forhtml='email'>Email ID</label>
            <input type='email' id='email'
                ref={usrEmail}/>
            <label forhtml='phone'>Contact No</label>
            <input type='tel' pattern='[0-9] {3}-[0-9] {2}-[0-9] {3}' id='phone'
                ref={usrPhone}
                required/>
            <Button className={
                    classes.submit
                }
                type='submit'
                onClick={submitDetails}>Submit</Button>
        </form>
    )
};
export default React.memo(Contact);
