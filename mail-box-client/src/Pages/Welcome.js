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

const Welcome = ()=>{
    const navigate = useNavigate();

    const emails = useSelector(state=>state.mails.mails);
    const getURL = 'https://mail-box-client-fcae9-default-rtdb.firebaseio.com';
    const dispatch = useDispatch();

    //get all mails in inbox
  useEffect(
    ()=>{
        const getEmailsInterval = setInterval(async()=>
        {
          console.log('my interval', getEmailsInterval);
            try
            {
                const receiver = localStorage.getItem('EMAIL').replace(/['@.']/g,'');
                const res = await axios.get(`${getURL}/inbox/${receiver}.json`);
                if(res.status===200)
                {
                    let emailsArr = [];
                    for(const key in res.data)
                    {
                        emailsArr.push(
                            {id: key ,
                             sender:res.data[key].sender,
                             subject:res.data[key].subject,
                             message:res.data[key].message,
                             sent_date:res.data[key].sent_date,
                             sent_time:res.data[key].sent_time,
                             seen:res.data[key].seen});
                    } 
                    // setEmails(emailsArr);
                    dispatch(MailsAction.addMails({mails : emailsArr}));
                }
            }
            catch(error){
                alert('Could not fetch emails due to some issues!');
            }
          },2000);
          return ()=> clearInterval(getEmailsInterval); 
    },[dispatch,getURL]
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