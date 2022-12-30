import {useLocation} from 'react-router-dom';
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

    const{isLoading,sendRequest} = useHttp();

    useEffect(()=>{
        const markEmailsAsSeen = async()=>{
            const receiver = localStorage.getItem('EMAIL').replace(/['@.']/g,'');
            const seenObj = {
                seen:true
            }
            sendRequest({type:'patch',URL:`${putURL}/inbox/${receiver}/${email.id}.json`,
            body : seenObj
            });
            dispatch(MailsAction.markEmailsAsSeen(email.id));
        }
    markEmailsAsSeen();
    },[dispatch,putURL,email,sendRequest]     
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