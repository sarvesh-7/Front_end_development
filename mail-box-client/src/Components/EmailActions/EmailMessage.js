import {useLocation} from 'react-router-dom';
import {MailsAction} from '../../Store/Mails';
import {useDispatch} from 'react-redux';
import {useEffect,useRef} from 'react';
import Card from 'react-bootstrap/Card';
import useHttp from '../../Hooks/use-http';
import htmlToDraft from 'html-to-draftjs';

const EmailMessage = ()=>{
    const location = useLocation();
    const {email} = location.state;

    const putURL = 'https://mail-box-client-fcae9-default-rtdb.firebaseio.com';

    const dispatch = useDispatch();

    const{isLoading,sendRequest} = useHttp();

    //mark emails as seen if we click on it
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

    const div = document.createElement('div');
    div.innerHTML = email.message;
    console.log(div);

return(
    <>
    <Card.Header>
    <h4>From : {email.sender}</h4>
    <h6>To : {localStorage.getItem('EMAIL')}</h6>
    <h6>Subject : {email.subject}</h6>
    </Card.Header>
    <Card.Body>
    {
        // email.message.map((data)=>{
        //     return <div>{data}</div>
        // })
    <div dangerouslySetInnerHTML={{__html: email.message}}/>
    }
    </Card.Body>
    </>
)
}
export default EmailMessage;