import Button from '../Components/UI/Button';
import classes from './Logout.module.css';
import AuthContext from '../Components/Store/AuthContext';
import {useContext} from 'react';
import {useNavigate} from 'react-router-dom';

const Logout = ()=>{

    //get user auth details
    const authCtx = useContext(AuthContext);

    const navigate = useNavigate();

    //clear authtoken and email from local storage and go to login page
    const logoutHandler = (e)=>{
        authCtx.updateAuthInfo('','');
    }
    return(
        <Button onClick={logoutHandler} className={classes.logout}>Logout</Button>
    )
};
export default Logout;