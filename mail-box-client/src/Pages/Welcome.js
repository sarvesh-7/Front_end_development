import Button from 'react-bootstrap/Button';
import classes from './Welcome.module.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useState} from 'react';
import Compose from '../Components/EmailActions/Compose';

const Welcome = ()=>{
    const[emailAction,setEmailAction] = useState('');

    //set email action type
    const setEmailActionHandler=(e)=>{
        setEmailAction('Compose');
    }

    return(
        <>
        <h1>Welcome to mail Box client</h1><hr/>
        <Container>
            <Row>
                <Col lg={2}>
                    <Button onClick={setEmailActionHandler}>Compose</Button>
                </Col>
                <Col lg={10}>
                    {
                        emailAction === 'Compose' &&
                        <Compose/>
                    } 
                </Col>
            </Row>
        </Container>
        </>
    )
};
export default Welcome;