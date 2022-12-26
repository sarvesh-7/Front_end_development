import {useLocation} from 'react-router-dom';
import axios from 'axios';
import {MailsAction} from '../../Store/Mails';
import {useDispatch} from 'react-redux';
import {useEffect} from 'react';
import Card from 'react-bootstrap/Card';

const SentEmailMessage = ()=>{
    const location = useLocation();
    console.log(location);
    const {email} = location.state;

return(
    <>
    <Card.Header>
    <h4>From : {localStorage.getItem('EMAIL')}</h4>
    <h6>To : {email.receiver}</h6>
    <h6>Subject : {email.subject}</h6>
    </Card.Header>
    <Card.Body>
    {
        email.message.map((data)=>{
            return <div>{data}</div>
        })
    }
    </Card.Body>
    </>
)
}
export default SentEmailMessage;