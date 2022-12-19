import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FloatingLabel } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import classes from './SignUp.module.css';
import {useRef} from 'react';


const Signup = ()=>{

    const emailRef = useRef();
    const passwordRef = useRef();
    const confPasswordRef = useRef();

    const registerUserHandler=async(e)=>{
        e.preventDefault();
        //get email and password entered on screen
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const confPasword = confPasswordRef.current.value;
    
        //check if all fields are not empty
        if(email===''||password===''||confPasword==='')
        {
            alert('All fields are mandatory');
        }
    
        else if(password!==confPasword)
        {
            alert('Please enter same confirmation password');
        }
    
        //check if password and email has valid format and then create new user in firebase
        else
        {
            try{
                const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDbXtMUr8ca76hG1NbgPdpzj0rqJOB6aYo',
              {
                method:'POST',
                body: JSON.stringify({
                  email:email,
                  password:password,
                  returnSecureToken:true
                }),
                header:{
                  'Content-Type':'application/json'
                }
              });
              if(res.ok){
                //when succesfully created account
                alert('User created successfully');
              }
              else{
                //when account creation failed due to same email or weak password etc
                const data = await res.json();
                console.log(data.error.message);
                alert(data.error.message);
              }
              }
              catch(error){
                console.log(error);
              }
        }
    }

    return(
        <Container className='m-5'>
        <Row>
        <Col className={classes.authForm} lg={3} xs={6}>
        <Card className="p-2">
        <Card.Title className="m-auto">Sign up</Card.Title>
        <Card.Body>
        <Form> 
            <Form.Group> 
                {/* <FloatingLabel controlId = "floatingInput" 
                label="Email" className="mb-3"> */}
                <Form.Control size="sm" className="mb-3" ref={emailRef} type="email" placeholder="Email"/>
                {/* </FloatingLabel> */}
                <Form.Control size="sm" className="mb-3" ref={passwordRef} type="password" placeholder="Password"/>
                <Form.Control size="sm" className="mb-3" ref={confPasswordRef} type="password" placeholder="Confirm Password"/>
                <div className="d-grid gap-2">
                <Button type="Submit" onClick={registerUserHandler} bg="Primary" className="rounded-pill">Sign up</Button>
                </div>
            </Form.Group>
        </Form>
        </Card.Body>
        </Card>
        <Card className="mt-2">
        <Card.Link className="p-2">Have an account?Login</Card.Link>
        </Card>
        </Col>
        </Row>
        </Container>
    )
};
export default Signup;