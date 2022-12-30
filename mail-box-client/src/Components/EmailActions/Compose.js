import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import classes from './Compose.module.css';
import {useRef} from 'react';
import Form from 'react-bootstrap/Form';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import useHttp from '../../Hooks/use-http'; 


const Compose = (props)=>{

    //firebase realtime database URL
    const url = 'https://mail-box-client-fcae9-default-rtdb.firebaseio.com/';
    const senderEmail = localStorage.getItem('EMAIL');

    const{isLoading,sendRequest} = useHttp();

    const toEmailRef = useRef();
    const subjectRef = useRef();

    let message;

    const getEmailMsgHandler=(event)=>{
        message = [];
        event.blocks.forEach((block)=>{
            message.push(block.text);  
        })
    };

    const sendEmailHandler=async()=>{

        //updat sentbox and inbox emails in firebase
        const sender = senderEmail.replace(/['@.']/g,''); 
        const receiver = toEmailRef.current.value.replace(/['@.']/g,'');
        const date = new Date();
        const curr_date = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+ date.getDate();
        const curr_time= date.getHours()+":"+date.getMinutes();

        const responseHandler = (resdata)=>{
            alert('Mail sent successfully');

            sendRequest({type:'post',URL:`${url}/inbox/${receiver}.json`,
                body : { 
                    subject:subjectRef.current.value,
                    message,
                    sender : senderEmail,
                    sent_date : curr_date,
                    sent_time : curr_time,
                    seen : false
                }
                }); 

        }

        if(!receiver)
            alert('Add atleast one recipient');
        else if(!message)
            alert('please add email message');
        else{

                sendRequest({type:'post',URL:`${url}/sentbox/${sender}.json`,
                body : { 
                    subject:subjectRef.current.value,
                    message,
                    receiver : toEmailRef.current.value,
                    sent_date : curr_date,
                    sent_time : curr_time
                    },
                }, responseHandler);
            }
    }

    return(
        <>
                <Form.Control size="sm" className='mb-3' ref={toEmailRef} type="email" placeholder="To"/>
                <Form.Control size="sm" className='mb-3' ref={subjectRef} type="text" placeholder="Subject"/>
                <Editor
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName={classes.editor}
                onChange={getEmailMsgHandler}
                />
                <Card.Footer>
                <Button onClick={sendEmailHandler}>Send</Button>
                </Card.Footer>
        </>
    )
};

export default Compose;