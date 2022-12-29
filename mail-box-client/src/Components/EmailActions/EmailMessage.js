import {useLocation} from 'react-router-dom';
import axios from 'axios';
import {MailsAction} from '../../Store/Mails';
import {useDispatch} from 'react-redux';
import {useEffect} from 'react';
import Card from 'react-bootstrap/Card';
import useHttp from '../../Hooks/use-http';

const EmailMessage = ()=>{
    const location = useLocation();
    console.log(location);
    const {email} = location.state;

    const putURL = 'https://mail-box-client-fcae9-default-rtdb.firebaseio.com';

    const dispatch = useDispatch();

    const{isLoading,status,sendRequest} = useHttp();

    useEffect(()=>{
        const markEmailsAsSeen = async()=>{
            const receiver = localStorage.getItem('EMAIL').replace(/['@.']/g,'');
            const updatedEmail = {
                id: email.id ,
                sender:email.sender,
                subject:email.subject,
                message:email.message,
                sent_date:email.sent_date,
                sent_time:email.sent_time,
                seen:true
            }
            sendRequest({type:'put',URL:`${putURL}/inbox/${receiver}/${email.id}.json`,
            body : updatedEmail
            });
            // const res = await axios.put(`${putURL}/inbox/${receiver}/${email.id}.json`,updatedEmail);
            // console.log(res);
            dispatch(MailsAction.editMail({email : updatedEmail}));
        }
    markEmailsAsSeen();
    },[dispatch,putURL,email]     
    )

return(
    <>
    <Card.Header>
    <h4>From : {email.sender}</h4>
    <h6>To : {localStorage.getItem('EMAIL')}</h6>
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
export default EmailMessage;