import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useNavigate,Outlet} from 'react-router-dom';
import {useSelector} from 'react-redux';
import Logout from '../Components/Auth/Logout';
import classes from './Welcome.module.css';

const Welcome = ()=>{
    const navigate = useNavigate();

    const emails = useSelector(state=>state.mails.mails);

    //set email action type
    const composeEmailHandler=(e)=>{
        navigate('/Welcome/Compose');
    }

    const InboxHandler=(e)=>{
        navigate('/Welcome/Inbox');
    }

    //count unseen messages
    let unSeenMailsCount = 0;

    if(emails)
    {
        emails.forEach((email)=>{
            if(!email.seen)
            unSeenMailsCount++;
        })
    }
    
    return(
        <>
        <div className={classes.header}>
        <h3>Welcome to your Mail Box</h3>
        <Logout/>
        </div>
        <Container>
            <Row>
                <Col lg={2}>
                <div className="d-grid mb-2">
                    <Button onClick={composeEmailHandler}>Compose</Button>
                </div>
                <div className="d-grid mb-2">
                    <Button onClick={InboxHandler}>Inbox</Button>
                </div>
                <div>
                    Unseen Messages : {unSeenMailsCount}
                </div>
                </Col>
                <Col lg={10}>
                    {
                        <Card>
                        <Card.Body>
                        <Outlet/>
                        </Card.Body>
                        </Card>
                    } 
                    {  
                    }
                </Col>
            </Row>
        </Container>
        </>
    )
};
export default Welcome;