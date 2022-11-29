import React,{Fragment,useRef,useContext} from 'react';
import {Link} from 'react-router-dom';
import Button from '../Components/UI/Button';
import classes from './Profile.module.css';
import AuthContext from '../Components/Store/AuthContext';
const Profile = (props)=>{

    const fullNameRef = useRef();
    const profileUrlRef = useRef();

    const authCtx = useContext(AuthContext);

    //path to update user profile in firebase
    const url = 'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAzi_a8TFUiRe70M2TSFzybhf5lVXqu7Wc';

    //update user profile in firebase
    const updateProfileHandler = async(e)=>{
        e.preventDefault();
        const fullName = fullNameRef.current.value;
        const profileUrl = profileUrlRef.current.value;

        try{
            const res = await fetch(`${url}`,
        {
            method:'POST',
            body:JSON.stringify({
                idToken : authCtx.token,
                displayName : fullName,
                photoUrl : profileUrl,
                returnSecureToken : true
            }),
            header:{
                'Content-Type':'application/json'
            }
        });

        if(res.ok){
            alert('Profile updated successfully');
        }
        else{
            alert('Error while updating profile details');
        }
        }
        catch(error){
            console.log(error);
        }  
    }
    return(
        <Fragment>
        <div className={`${classes.welcome} font-italic`}>
        <p>Winners never quite,quitters never win.</p>
        <p className={classes.profile}>Your profile is 64% complete.
        <Link to='/profile'>Complete now</Link> 
        </p>
        </div>
        <hr/>
        <div className={classes.main}>
        <div className={classes.formHeader}>
            <span>Contact Details</span>
            <Button className={classes.cancel}>Cancel</Button>
            </div>
        <form className={classes.contactForm}> 
            <label forhtml='full_html'>Full Name</label>
            <input type='text' id='full_html' ref={fullNameRef}/>
            <label forhtml='profile_url'>Profile Photo URL</label>
            <input type='url' id='profile_url' ref={profileUrlRef}/>
            <Button type='submit' onClick={updateProfileHandler} className={classes.update}>Update</Button>  
        </form>
        <hr/>
        </div>
        
        </Fragment>
    );
}
export default Profile;