import Button from 'react-bootstrap/Button';
import classes from './Welcome.module.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useState} from 'react';
import Compose from '../Components/EmailActions/Compose';
import Inbox from '../Components/EmailActions/Inbox';
import {useNavigate} from 'react-router-dom';

const Welcome = ()=>{
    const[emailAction,setEmailAction] = useState('');
    const navigate = useNavigate();

    //set email action type
    const composeEmailHandler=(e)=>{
        setEmailAction('Compose');
        navigate('/Welcome/Compose',{replace:true});
    }

    const InboxHandler=(e)=>{
        setEmailAction('Inbox');
        navigate('/Welcome/Inbox');
    }

    return(
        <>
        <h1>Welcome to mail Box client</h1><hr/>
        <Container>
            <Row>
                <Col lg={2}>
                <div className="d-grid mb-2">
                    <Button onClick={composeEmailHandler}>Compose</Button>
                </div>
                <div className="d-grid mb-2">
                    <Button onClick={InboxHandler}>Inbox</Button>
                </div>
                </Col>
                <Col lg={10}>
                    {
                        emailAction === 'Compose' &&
                        <Compose/>
                    } 
                    {
                        emailAction === 'Inbox' &&
                        <Inbox/>
                    }
                </Col>
            </Row>
        </Container>
        </>
    )
};
export default Welcome;