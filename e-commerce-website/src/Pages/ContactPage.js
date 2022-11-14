import React,{useState,useCallback} from 'react';
import ContactForm from './ContactForm';
import Message from '../Components/Message/Message';

const ContactPage = (props)=>{     

//state to manage error/success message
const [content, setContent] = useState(null);

 //remove message content after 2 seconds
 const removeMessage = ()=>{
    setTimeout(()=>{
        setContent(null);
    }, 2000);
}

//save user details on backend using API call
const saveUserData = useCallback(async(userData)=>{
    setContent(null);
    try{
        fetch(`https://ecomm-app-5e1af-default-rtdb.firebaseio.com/users.json`,{
            method : 'POST',
            body : JSON.stringify(userData),
            headers : {
                'Content-Type' : 'application/json'
            }
        });
        //if data successfully stored display success message
        setContent('We have received your contact details. we will get back to you soon');
    }
    //if any error encountered then show it to the user
    catch(error){
        setContent('Something went wrong!!');
    }
    removeMessage(); //remove info message after 2 seconds
},[]);

    return(
        <React.Fragment>
        <ContactForm onSubmitForm={saveUserData}/>
        {
            content && <Message>{content}</Message>
        }   
        </React.Fragment>
    )
};
export default React.memo(ContactPage);