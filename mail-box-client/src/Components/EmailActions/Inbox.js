import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useDispatch,useSelector} from 'react-redux';
import classes from './Inbox.module.css';
import {Route,Routes,useNavigate,Link,NavLink} from 'react-router-dom';

const Inbox = ()=>{
    
    const emails = useSelector(state=>state.mails.mails);

    return(    
                <Container>
                {
                    emails &&
                    emails.map((email)=>{
                        return <>
                    <NavLink className={classes.mailBox} to={`/Welcome/Inbox/${email.id}`} state={{email : email}}>
                        <Row key={email.id} className={`${classes.row} ${!email.seen && 'fw-bold'}`}>
                            <Col lg={4}>
                            {!email.seen &&  
                            <i class="fa fa-circle" style={{fontSize:'10px', color:'blue', marginRight:'1rem'}}></i>
                            }
                            {email.sender}</Col>
                            <Col lg={5}>{email.subject}</Col>
                            <Col lg={2}>{email.sent_date}</Col>
                            <Col lg={1}>{email.sent_time}</Col> 
                        </Row>
                    </NavLink>
                    <hr/></>
                    })
                }
                </Container>
    )
};
export default Inbox;
