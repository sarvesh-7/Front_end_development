import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import classes from '../../Pages/Welcome.module.css';

const NavigationBar = ()=>{
    return(
        <Navbar className={classes.shadow} collapseOnSelect bg='primary' variant='dark' expand='md'>
            <Container fluid>
                <Navbar.Brand href='/'>MailBox Client</Navbar.Brand>
                <Navbar.Toggle aria-controls="navLinks"/>
                <Navbar.Collapse id="navLinks" className={classes.right_aligned}>
                <Nav>
                <Nav.Link href='#'>Home</Nav.Link>
                <Nav.Link href='#'>Store</Nav.Link>
                <Nav.Link href='#'>About</Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
};
export default NavigationBar;