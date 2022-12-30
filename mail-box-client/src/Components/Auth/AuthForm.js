import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import classes from './AuthForm.module.css';
import {useRef,useState} from 'react';
import {Link} from 'react-router-dom';
import {authActions} from '../../Store/Auth';
import {useDispatch} from 'react-redux';

const AuthForm = ()=>{

    const emailRef = useRef();
    const passwordRef = useRef();
    const confPasswordRef = useRef();

    const dispatch = useDispatch();

    //login/signup state
    const[isLogin,setIsLogin] = useState(false);

    const signupHandler=async(e)=>{
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

    const loginHandler=async(e)=>{

      const email = emailRef.current.value;
      const password = passwordRef.current.value; 

      e.preventDefault();
      //check if all fields are not empty
      if(email===''||password==='')
      {
          alert('Please enter login credentials');
          return;
      }
      try{
          const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDbXtMUr8ca76hG1NbgPdpzj0rqJOB6aYo',
        {
          method:'POST',
          body: JSON.stringify({
            email,
            password,
            returnSecureToken:true
          }),
          header:{
            'Content-Type':'application/json'
          }
        });
        if(res.ok){
          //if credential matches
          alert('User authenticated successfully');
          const data = await res.json();

          //update auth details in redux store
          dispatch(authActions.updateAuthInfo({token : data.idToken, email : email}));

          //update in local storage
          localStorage.setItem('EMAIL',email);
          localStorage.setItem('TOKEN', data.idToken);
        }
        else{
          //if credentials are wrong
          const data = await res.json();
          alert(data.error.message);
      }
    }
      catch(error){
        //do something
        console.log(error.message);
      }
    }

    //switch between login/auth state
    const switchAuthHandler=(e)=>{
      setIsLogin((prevState) => !prevState);
            emailRef.current.value = '';
            passwordRef.current.value = '';
            confPasswordRef.current.value = '';
    }

    return(
        <Container className='m-5'>
        <Row>
        <Col className={classes.authForm } lg={4} sm={8} md={6}>
        <Card className="p-2">
        { !isLogin && <Card.Title className="m-auto">Sign up</Card.Title>}
        { isLogin && <Card.Title className="m-auto">Login</Card.Title>}
        
        <Card.Body>
        <Form> 
            <Form.Group> 
                <Form.Control size="sm" className="mb-3" ref={emailRef} type="email" placeholder="Email"/>
                <Form.Control size="sm" className="mb-3" ref={passwordRef} type="password" placeholder="Password"/>
                {!isLogin &&  <Form.Control size="sm" className="mb-3" ref={confPasswordRef} type="password" placeholder="Confirm Password"/>}
                {isLogin && <Link to='/ForgotPassword'>Forgot password</Link>}
                <div className="d-grid gap-2 mt-2">
                {
                  !isLogin && 
                  <Button type="Submit" onClick={signupHandler} bg="Primary" className="rounded-pill">Sign up</Button>
                }
                {
                  isLogin && <Button type="Submit" onClick={loginHandler} bg="Primary" className="rounded-pill">Login</Button>
                }
               
                </div>
            </Form.Group>
        </Form>
        </Card.Body>
        </Card>
        <Card className="mt-2">
        { !isLogin && <Button onClick={switchAuthHandler}>Have an account?Login</Button> }
        { isLogin && <Button onClick={switchAuthHandler}>Dont Have an account?Signup</Button> }
        </Card>
        </Col>
        </Row>
        </Container>
    )
};
export default AuthForm;