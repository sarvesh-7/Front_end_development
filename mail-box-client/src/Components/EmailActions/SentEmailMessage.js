import {useLocation} from 'react-router-dom';
import Card from 'react-bootstrap/Card';

const SentEmailMessage = ()=>{
    const location = useLocation();
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
        // email.message.map((data)=>{
        //     return <div>{data}</div>
        // })
        <div dangerouslySetInnerHTML={{__html: email.message}}/>
    }
    </Card.Body>
    </>
)
}
export default SentEmailMessage;