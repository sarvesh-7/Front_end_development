import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useDispatch,useSelector} from 'react-redux';
import classes from './Inbox.module.css';
import {Route,Routes,useNavigate,Link,NavLink} from 'react-router-dom';
import axios from 'axios';
import {MailsAction} from '../../Store/Mails';
import {useEffect} from 'react';
import useHttp from '../../Hooks/use-http';

const Sentbox = ()=>{
    
    const emails = useSelector(state=>state.mails.sentBox);
    const deleteURL = 'https://mail-box-client-fcae9-default-rtdb.firebaseio.com/';
    const getURL = 'https://mail-box-client-fcae9-default-rtdb.firebaseio.com';
    const dispatch = useDispatch();
    const {isLoading,error,sendRequest} = useHttp();

    useEffect(
        ()=>{
            const transformMails=(email)=>{
                let emailsArr = [];
                console.log('received mails', email);
                for(const key in email)
                {
                    emailsArr.push(
                    {
                        id: key ,
                        receiver:email[key].receiver,
                        subject:email[key].subject,
                        message:email[key].message,
                        sent_date:email[key].sent_date,
                        sent_time:email[key].sent_time,
                    });
                } 
                console.log(emailsArr, 'sentbox');
                dispatch(MailsAction.addSentMails({mails : emailsArr}));
            }
            const sender = localStorage.getItem('EMAIL').replace(/['@.']/g,'');
            // const res = await axios.get(`${getURL}/sentbox/${sender}.json`);
            sendRequest({type:'get',URL:`${getURL}/sentbox/${sender}.json`},transformMails); 
        },[dispatch,getURL,sendRequest]
    )

    const deleteMailHandler = async(email)=>{
        const sender = localStorage.getItem('EMAIL').replace(/['@.']/g,'');
        // const res = await axios.delete(`${deleteURL}sentbox/${sender}/${email.id}.json`);
        sendRequest({type:'delete',URL:`${deleteURL}sentbox/${sender}/${email.id}.json`});
        dispatch(MailsAction.deleteSentMail({email}));
    }

    return(    
                <Container>
                {
                    emails &&
                    emails.map((email)=>{
                        return <>
                        <Row key={email.id} className={`${classes.row}`}>
                            <Col lg={11}>
                            <NavLink className={classes.mailBox} to={`/Welcome/Sentbox/${email.id}`} state={{email : email}}>
                            <Row>
                            <Col lg={8}> 
                            {email.receiver}<br/>
                            {email.subject}
                            </Col>
                            <Col lg={3}>{email.sent_date} / {email.sent_time}</Col>
                            </Row>
                            </NavLink>
                            </Col>
                            
                            <Col lg={1}><i class="fa fa-trash" onClick={()=>deleteMailHandler(email)}></i></Col>   
                        </Row>
                    
                    <hr/></>
                    })
                }
                </Container>
    )
};
export default Sentbox;
