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

const Sentbox = ()=>{
    
    const emails = useSelector(state=>state.mails.sentBox);
    const deleteURL = 'https://mail-box-client-fcae9-default-rtdb.firebaseio.com/';
    const getURL = 'https://mail-box-client-fcae9-default-rtdb.firebaseio.com';
    const dispatch = useDispatch();

    useEffect(
        ()=>{
            const getEmails = async()=>
            {
                try
                {
                    const sender = localStorage.getItem('EMAIL').replace(/['@.']/g,'');
                    const res = await axios.get(`${getURL}/sentbox/${sender}.json`);
                    if(res.status===200)
                    {
                        let emailsArr = [];
                        for(const key in res.data)
                        {
                            emailsArr.push(
                                {id: key ,
                                 receiver:res.data[key].receiver,
                                 subject:res.data[key].subject,
                                 message:res.data[key].message,
                                 sent_date:res.data[key].sent_date,
                                 sent_time:res.data[key].sent_time,
                                });
                        } 
                        console.log(res.data);
                        dispatch(MailsAction.addSentMails({mails : emailsArr}));
                    }
                }
                catch(error){
                    alert('Could not fetch emails due to some issues!');
                }
              } 
              getEmails();  
        },[dispatch,getURL]
    )

    const deleteMailHandler = async(email)=>{
        const sender = localStorage.getItem('EMAIL').replace(/['@.']/g,'');
        try
        {
            const res = await axios.delete(`${deleteURL}sentbox/${sender}/${email.id}.json`);
            if(res.status===200)
            {
                alert('deletion successful');
                dispatch(MailsAction.deleteSentMail({email}));
            }
            else{
                alert('Something went wrong! please try again later');
            }
            
        }
        catch(error)
        {
            alert('Something went wrong! please try again later');
        }
        
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
