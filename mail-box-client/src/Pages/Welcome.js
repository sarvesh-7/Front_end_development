import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useNavigate,Outlet} from 'react-router-dom';
import Logout from '../Components/Auth/Logout';
import classes from './Welcome.module.css';
import {useSelector,useDispatch} from 'react-redux';
import axios from 'axios';
import {MailsAction} from '../Store/Mails';
import {useEffect} from 'react';
import useHttp from '../Hooks/use-http';

const Welcome = ()=>{
    const navigate = useNavigate();

    const emails = useSelector(state=>state.mails.mails);
    const getURL = 'https://mail-box-client-fcae9-default-rtdb.firebaseio.com';
    const dispatch = useDispatch();

    const {isLoading, error, sendRequest} = useHttp();

    //get all mails in inbox
  useEffect(
    ()=>{
    const transformMails = (emails)=>{
        let emailsArr = [];
        // console.log(emails);
        for(const key in emails)
        {
            emailsArr.push(
            {
                id: key ,
                sender:emails[key].sender,
                subject:emails[key].subject,
                message:emails[key].message,
                sent_date:emails[key].sent_date,
                sent_time:emails[key].sent_time,
                seen:emails[key].seen
            });
        }
        // console.log(emailsArr); 
        dispatch(MailsAction.addMails({mails : emailsArr}));
    }

        // const getEmailsInterval = setInterval(async()=>
        // {
        //   console.log('my interval', getEmailsInterval);
          const receiver = localStorage.getItem('EMAIL').replace(/['@.']/g,'');
          sendRequest({type : 'get' , URL:`${getURL}/inbox/${receiver}.json`}, transformMails);
        //   },
        // 2000);

        // return ()=> clearInterval(getEmailsInterval); 
    },[dispatch,getURL,sendRequest]
);

    //set email action type
    const composeEmailHandler=(e)=>{
        navigate('/Welcome/Compose');
    }

    const InboxHandler=(e)=>{
        navigate('/Welcome/Inbox');
    }

    const SentboxHandler=(e)=>{
        navigate('/Welcome/Sentbox');
    }

    //count unseen messages
    let unSeenMailsCount = 0;

    if(emails)
    {
        emails.forEach((email)=>{
            if(!email.seen)
            unSeenMailsCount++;
        })
    }
    
    return(
        <>
        <div className={classes.header}>
        <h3>Welcome to your Mail Box</h3>
        <Logout/>
        </div>
        <Container>
            <Row>
                <Col lg={2}>
                <div className="d-grid mb-2">
                    <Button onClick={composeEmailHandler}>Compose</Button>
                </div>
                <div className="d-grid mb-2">
                    <Button onClick={InboxHandler}>Inbox</Button>
                </div>
                <div className="d-grid mb-2">
                    <Button onClick={SentboxHandler}>Sentbox</Button>
                </div>
                <div>
                    Unseen Messages : {unSeenMailsCount}
                </div>
                </Col>
                <Col lg={10}>
                    {
                        <Card>
                        <Card.Body>
                        <Outlet/>
                        </Card.Body>
                        </Card>
                    } 
                    {  
                    }
                </Col>
            </Row>
        </Container>
        </>
    )
};
export default Welcome;