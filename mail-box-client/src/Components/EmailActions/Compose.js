import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import classes from './Compose.module.css';
import {useRef,useState} from 'react';
import Form from 'react-bootstrap/Form';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import axios from 'axios'; 


const Compose = (props)=>{

    //firebase realtime database URL
    const url = 'https://mail-box-client-fcae9-default-rtdb.firebaseio.com/';
    const senderEmail = localStorage.getItem('EMAIL');

    const toEmailRef = useRef();
    const subjectRef = useRef();

    let message;

    const getEmailMsgHandler=(event)=>{
        message = [];
        event.blocks.forEach((block)=>{
            message.push(block.text);  
        })
        console.log(message);
    };

    const sendEmailHandler=async()=>{

        //updat sentbox and inbox emails in firebase
        const sender = senderEmail.replace(/['@.']/g,''); 
        const receiver = toEmailRef.current.value.replace(/['@.']/g,'');

        if(!receiver)
            alert('Add atleast one recipient');
        else if(!message)
            alert('please add email message');
        else{
            try
            {
                const date = new Date();
                const curr_date = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+ date.getDate();
                const curr_time= date.getHours()+":"+date.getMinutes();

                const sendingRes = await axios.post(`${url}sentbox/${sender}.json`,
                {
                    subject:subjectRef.current.value,
                    message,
                    receiver : toEmailRef.current.value,
                    sent_date : curr_date,
                    sent_time : curr_time
                }                
             );

             if(sendingRes.status===200)
             {
                const receivingRes = await axios.post(`${url}inbox/${receiver}.json`,
                {
                    subject:subjectRef.current.value,
                    message,
                    sender : senderEmail,
                    sent_date : curr_date,
                    sent_time : curr_time
                }
               );
               if(receivingRes.status===200)
                alert('Email sent!');
                else
                alert('Something went wrong! Please try again later..');
             }
             else
                alert('Something went wrong! Please try again later..');
            }
            catch(error){
                alert('Something went wrong! Please try again later..');
            }  
        }
    }

    return(
        <Card>
            <Card.Body>
                <Form.Control size="sm" className='mb-3' ref={toEmailRef} type="email" placeholder="To"/>
                <Form.Control size="sm" className='mb-3' ref={subjectRef} type="text" placeholder="Subject"/>
                <Editor
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName={classes.editor}
                onChange={getEmailMsgHandler}
                />
            </Card.Body>
            <Card.Footer>
                <Button onClick={sendEmailHandler}>Send</Button>
            </Card.Footer>
        </Card>
    )
};

export default Compose;