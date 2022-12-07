import Button from '../Components/UI/Button';
import classes from './Logout.module.css';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {authAction} from '../store/Auth';

const Logout = ()=>{

    const dispatch = useDispatch();

    const navigate = useNavigate();

    //clear authtoken and email from local storage and go to login page
    const logoutHandler = (e)=>{
        dispatch(authAction.updateAuthInfo({token:'',email:''}));
    }
    return(
        <Button onClick={logoutHandler} className={classes.logout}>Logout</Button>
    )
};
export default Logout;