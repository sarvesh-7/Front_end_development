import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useNavigate,Outlet} from 'react-router-dom';
import Logout from '../Components/Auth/Logout';
import classes from './Welcome.module.css';
import {useSelector,useDispatch} from 'react-redux';
import {MailsAction} from '../Store/Mails';
import {useEffect,useState} from 'react';
import useHttp from '../Hooks/use-http';

const Welcome = ()=>{
    const navigate = useNavigate();

    const emails = useSelector(state=>state.mails.mails);
    const getURL = 'https://mail-box-client-fcae9-default-rtdb.firebaseio.com';
    const dispatch = useDispatch();

    const {isLoading,sendRequest} = useHttp();

    //set active button between compose,inbox and sentbox buttons
    const [activeButton,setActiveButton] = useState('Inbox');

    //get all mails in inbox
  useEffect(
    ()=>{
    const transformMails = (emails)=>{
        let emailsArr = [];
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
        };
        //reverse array to get latest emails on top and then update in redux store
        dispatch(MailsAction.addMails({mails : emailsArr.reverse()}));
    }

    //make API calls after every 2 seconds to get latest emails in inbox
        const getEmailsInterval = setInterval(async()=>
        {
          console.log('my interval', getEmailsInterval);
          const receiver = localStorage.getItem('EMAIL').replace(/['@.']/g,'');
          sendRequest({type : 'get' , URL:`${getURL}/inbox/${receiver}.json`}, transformMails);
          },
        2000);

        return ()=> clearInterval(getEmailsInterval); 
    },[dispatch,getURL,sendRequest]
);

    //set email action type
    const composeEmailHandler=(e)=>{
        setActiveButton('Compose');
        navigate('/Welcome/Compose');
    }

    const InboxHandler=(e)=>{
        setActiveButton('Inbox');
        navigate('/Welcome/Inbox');
    }

    const SentboxHandler=(e)=>{
        setActiveButton('Sentbox');
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
                    <Button variant = {activeButton==='Compose' ? 'primary' : 'outline-primary'}
                     onClick={composeEmailHandler}>Compose</Button>
                </div>
                <div className="d-grid mb-2">
                    <Button variant = {activeButton==='Inbox' ? 'primary' : 'outline-primary'} 
                    onClick={InboxHandler}>Inbox</Button>
                </div>
                <div className="d-grid mb-2">
                    <Button variant = {activeButton==='Sentbox' ? 'primary' : 'outline-primary'} 
                    onClick={SentboxHandler}>Sentbox</Button>
                </div>
                <div>
                    Unseen Messages : {unSeenMailsCount}
                </div>
                </Col>
                <Col lg={10}>
                    {
                        <Card className={classes.shadow}>
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