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
    const sender = localStorage.getItem('EMAIL');

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
        const receiver = toEmailRef.current.value.replace(/['@.']/g,'');
        if(!receiver)
            alert('Add atleast one recipient');
        else if(!message)
            alert('please add email message');
        else{
            try
            {
                const sendingRes = await axios.post(`${url}sentbox/${sender}/${receiver}.json`,
                {
                    subject:subjectRef.current.value,
                    message
                }                
             );

             if(sendingRes.status!==200)
                 throw new Error('Something went wrong! Please try again later..');

             const receivingRes = await axios.post(`${url}inbox/${receiver}/${sender}.json`,
             {
                 subject:subjectRef.current.value,
                 message
             }
            );
            
            if(receivingRes.status!==200)
            throw new Error('Something went wrong! Please try again later..');

            alert('Email sent!');

            }
            catch(error){
                alert(error);
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