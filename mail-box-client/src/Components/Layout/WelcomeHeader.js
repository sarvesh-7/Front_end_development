import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Logout from '../Auth/Logout';
import classes from '../../Pages/Welcome.module.css';
import Container from 'react-bootstrap/Container';
import React from 'react';

const WelcomeHeader = ()=>{
    return(
        <Navbar className={`${classes.shadow} mb-4`} collapseOnSelect bg="primary" variant='dark' expand='md'>
        <Container fluid>
            <Navbar.Brand href='/'>Welcome to your Mail Box </Navbar.Brand>
            <Navbar.Toggle aria-controls="navLinks"/>
            <Navbar.Collapse id="navLinks" className={classes.right_aligned}>
            <Nav >
            <Nav.Link href='#'><Logout/></Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
    )
}
export default React.memo(WelcomeHeader);