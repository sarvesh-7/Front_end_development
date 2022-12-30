import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useDispatch,useSelector} from 'react-redux';
import classes from './Inbox.module.css';
import {NavLink} from 'react-router-dom';
import {MailsAction} from '../../Store/Mails';
import useHttp from '../../Hooks/use-http';

const Inbox = ()=>{
    
    const emails = useSelector(state=>state.mails.mails);
    const deleteURL = 'https://mail-box-client-fcae9-default-rtdb.firebaseio.com/';
    const dispatch = useDispatch();

    const{isLoading,sendRequest} = useHttp();

    const deleteMailHandler = async(email)=>{
        const receiver = localStorage.getItem('EMAIL').replace(/['@.']/g,'');
        sendRequest({type:'delete',URL:`${deleteURL}inbox/${receiver}/${email.id}.json`});
        dispatch(MailsAction.deleteMail({email}));  
    }

    return(    
                <Container>
                {
                    emails &&
                    emails.map((email)=>{
                        return <>
                        <Row key={email.id} className={`${classes.row} ${!email.seen && 'fw-bold'}`}>
                            <Col lg={11}>
                            <NavLink className={classes.mailBox} to={`/Welcome/Inbox/${email.id}`} state={{email : email}}>
                            <Row>
                            <Col lg={8}>
                            {!email.seen &&  
                            <i class="fa fa-circle" style={{fontSize:'10px', color:'blue', marginRight:'1rem'}}></i>
                            }
                            {email.sender}<br/>
                            {email.subject}
                            </Col>
                            <Col lg={3}>{email.sent_date} / {email.sent_time}</Col>
                            </Row>
                            </NavLink>
                            </Col>
                            
                            <Col lg={1}><i class="fa fa-trash" onClick={()=>deleteMailHandler(email)}></i></Col>   
                        </Row>
                    
                    <hr/></>
                    })
                }
                </Container>
    )
};
export default Inbox;
