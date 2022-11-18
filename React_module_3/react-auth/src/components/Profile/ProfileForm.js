import classes from './ProfileForm.module.css';
import {useRef,useContext,useState} from 'react';
import {useHistory} from 'react-router-dom';
import userContext from '../Store/UserContext';

const ProfileForm = () => {
  const history = useHistory();
  const passwordRef = useRef();
  const userCtx = useContext(userContext);
  //state to show sending request loader
  const[isSendingReq, setIsSendingReq] = useState(false);

  //change user password
  const changePasswordHandler = async(event)=>{

    event.preventDefault();
    setIsSendingReq(true);

    try{
      const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyC7lmr4RcmF7Vj9__TB7b_Gr0VUHH5SoYI',
      {
        method : 'POST',
        body : JSON.stringify(
          {
            idToken : userCtx.token,
            password : passwordRef.current.value,
            returnSecureToken : true
          }),
        header : {
          'Content-Type' : 'application/json'
        }
      });
      if(res.ok){
        alert('password changed successfully');
        history.replace('/');
      }
      else{
        const data = await res.json();
        alert(data.error.message);
        setIsSendingReq(false);
        
      }
    }
    catch(error){
      console.log(error);
      setIsSendingReq(false);
    }

  }
  return (
    <form className={classes.form} onSubmit={changePasswordHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={passwordRef}/>
      </div> 
        {
          !isSendingReq &&
          <div className={classes.action}>
           <button>Change Password</button>
          </div>
        }
    </form>
  );
}

export default ProfileForm;
