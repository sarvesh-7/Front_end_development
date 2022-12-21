import Card from 'react-bootstrap/Card';
import axios from 'axios';
import {useEffect,useState} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const Inbox = ()=>{

    const getURL = 'https://mail-box-client-fcae9-default-rtdb.firebaseio.com';
    const[emails,setEmails] = useState([]); 
    
    useEffect(
        ()=>{
            const getEmails = async()=>
            {
                try
                {
                    const receiver = localStorage.getItem('EMAIL').replace(/['@.']/g,'');
                    const res = await axios.get(`${getURL}/inbox/${receiver}.json`);
                    if(res.status===200)
                    {
                        let emailsArr = [];
                        for(const key in res.data)
                        {
                            emailsArr.push(
                                {id: key ,
                                 sender:res.data[key].sender,
                                 subject:res.data[key].subject,
                                 sent_date:res.data[key].sent_date,
                                 sent_time:res.data[key].sent_time});
                        } 
                        setEmails(emailsArr);
                    }
                }
                catch(error){
                    alert('Could not fetch emails due to some issues!');
                }
                  
            }
            getEmails();
        },[]
    )
    console.log(emails);
    return(
        <Card>
            <Card.Body>
                <Container>
                {
                    emails.map((email)=>{
                        return <><Row key={email.id} className="fw-bold">
                            <Col lg={4}>{email.sender}</Col>
                            <Col lg={5}>{email.subject}</Col>
                            <Col lg={2}>{email.sent_date}</Col>
                            <Col lg={1}>{email.sent_time}</Col> 
                        </Row><hr/></>
                    })
                }
                </Container>
            </Card.Body>
        </Card>
    )
};
export default Inbox;
