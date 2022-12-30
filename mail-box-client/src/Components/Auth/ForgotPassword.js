import classes from './ForgotPassword.module.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import LoadingSpinner from '../UI/LoadingSpinner';
import { useRef,useState } from 'react';
import useHttp from '../../Hooks/use-http';

const ForgotPassword = ()=>{

    //get user email id to send password reset link
    const emailRef = useRef(); 
    
    const {sendRequest,isLoading} = useHttp();

    //reset password URL
    const resetPasswordUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDbXtMUr8ca76hG1NbgPdpzj0rqJOB6aYo';

    //reset password using link sent on email ID
    const resetPasswordHandler = async(e)=>{

        const responseHandler = ()=>{
            alert('Password reset link has been sent on entered mail ID');
        }
        
        e.preventDefault();
        const res = sendRequest(
            {
                type : 'post', 
                URL : resetPasswordUrl,
                body : 
                {
                    requestType:'PASSWORD_RESET',
                    email: emailRef.current.value
                }
             },
             responseHandler
            );    
    }

    return(
    <Container>
    <Row>
    <Col lg={5} className={`${classes.forgotPassword} mt-5`}>
    <Card border='primary' className={`${classes.card} p-3`}>
        <Form>
        <Form.Label forhtml='email'>Enter the email with which you have registered</Form.Label>
        <Form.Control type='email' id='email' placeholder='email' ref={emailRef}/>
        <Button className="mt-3" onClick={resetPasswordHandler}>Send Link</Button>
        </Form>
    </Card>
    </Col>
    </Row> 
    </Container>
    )
};
export default ForgotPassword;