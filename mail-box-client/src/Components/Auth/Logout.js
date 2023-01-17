import Button from 'react-bootstrap/Button';
import {useDispatch} from 'react-redux';
import {authActions} from '../../Store/Auth';

const Logout = ()=>{
    const dispatch = useDispatch();
    //clear email and token from localstorage and logout from the app
    const logoutHandler = ()=>{
        localStorage.removeItem('EMAIL');
        localStorage.removeItem('TOKEN');
        dispatch(authActions.updateAuthInfo({token:'',email:''}));
    }
    return(
        <Button bg="Primary" className="rounded-pill" onClick={logoutHandler}>
            Logout
        </Button>
    )
}

export default Logout;